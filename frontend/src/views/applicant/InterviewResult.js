import React,{Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, CardFooter, CardHeader, CardText, CardTitle} from "reactstrap";
import {FaItalic} from "react-icons/fa";
import applicantServices from "../../services/applicantServices";
import adminServices from "../../services/adminServices";
import Swal from "sweetalert2";
import {request} from "../../services/axios_helper";
import recruiterServices from "../../services/recruiterServices";


class InterviewResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            idI:'',
            result:[]
        };


    }

    async componentDidMount() {
        const currentUser = usersServices.getCurrentUserA_R();
        if (!currentUser) this.setState({redirect: "/Login"});
        const id = currentUser ? currentUser.id : 0

        this.setState({
            id: id ,
            idI: this.props.match.params.idI,
            result: await recruiterServices.getResultByInterview(this.props.match.params.idI)
        })

    }


confirm(id){

        applicantServices.updateStatus(id).then((res)=>{
          if(res){
              Swal.fire(
                  'Confirmed!!',
                  'You are Hired !!',
                  'success'
              )
          }
        })

}
    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }


        return(
            <Container fluid>

                <br/>
                            <Row >
                                <Col md="3"></Col>
                                <Card className="text-left" style={{width:'50%',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderColor:'gray',borderStyle:'outset'}}>
                                    <CardHeader style={{backgroundColor:'#F1F2F3'}}><b>Interview result</b> </CardHeader>
                                    <CardBody >
                                        <CardTitle>
                                            <h4>Recruiter Feedback : </h4>
                                        </CardTitle>
                                        <CardText>
                                            {this.state.result.response}
                                            <br/><br/>
                                            {this.state.result.result === 'Hired' ? (
                                                <div>
                                                <span>Click here to confirm : </span><br />
                                                <Button
                                                    className="btn btn-success"
                                                    onClick={()=>this.confirm(this.state.id)}
                                                >
                                                    Confirm
                                                </Button>
                                                </div>
                                            ) : (
                                             <div></div>
                                            )}

                                        </CardText>

                                    </CardBody>
                                </Card>
                            </Row>

            </Container>
        )
    }
}

export default InterviewResult;