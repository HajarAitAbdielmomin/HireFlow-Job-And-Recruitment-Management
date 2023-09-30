import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import usersServices from "../../services/users.services";
import {request} from 'services/axios_helper';
import {toast, ToastContainer} from "react-toastify";
import recruiterServices from "../../services/recruiterServices";

class JobForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            redirect:null,
            id:'',
            positionName: '',
            company: '',
            location:'',
            contract:'',
            salary:'',
            description:''

        }
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changePositionNameHandler = this.changePositionNameHandler.bind(this);
        this.changeCompanyHandler = this.changeCompanyHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeContractHandler = this.changeContractHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount(){
        const currentUser = usersServices.getCurrentUserA_R();

        if (!currentUser) this.setState({ redirect: "/Login" });

        this.setState({
            id : currentUser ? currentUser.id : 0
        })

    }
     save = async (e) => {
        e.preventDefault();

        if(this.state.positionName === '' || this.state.company === '' ||
            this.state.location === '' || this.state.contract === '' || this.state.salary === ''
            || this.state.description === ''
        ){

            toast.info('Note : Please fill in all fields !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }


         try{
             const response =  recruiterServices.postJob(this.state.id,
                 {
                     positionName : this.state.positionName,
                     description : this.state.description,
                     companyName : this.state.company,
                     city : this.state.location,
                     salary : this.state.salary,
                     contract : this.state.contract
                 }
                 )
            if (response) {
                this.clearForm()
                toast.success('New job has been added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        }catch (e){
            this.clearForm()
            toast.error('Something went wrong !!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('An error occurred : ',e)
        }

    }

    clearForm = () => {
        this.setState({
            positionName: '',
            company: '',
            location:'',
            contract:'',
            salary:'',
            description:''
        });
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changePositionNameHandler= (event) => {
        this.setState({positionName: event.target.value});

    }
    changeCompanyHandler= (event) => {
        this.setState({company: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeContractHandler= (event) => {
        this.setState({contract: event.target.value});
    }
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
render(){
    if (this.state.redirect) {
        return this.props.history.push(this.state.redirect)
    }

return(
  <>
      <Container fluid>
          <ToastContainer />
          <Row>
              <Col md="3"></Col>
              <Col md="6">

                  <h4>Post an offer</h4>
                          <Form className="-align-center" >
                              <div className = "form-group">
                                  <label> Position name : </label>
                                  <input placeholder="Position name" name="PositionName" className="form-control"
                                         type="text"
                                         style={{backgroundColor:'white'}}
                                         value={this.state.positionName} onChange={this.changePositionNameHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Company : </label>
                                  <input placeholder="Company name" name="CompanyName" className="form-control"
                                         type="text"

                                         style={{backgroundColor:'white'}}
                                         value={this.state.company} onChange={this.changeCompanyHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Location : </label>
                                  <input placeholder="Country/city" name="Location" className="form-control"
                                         type="text"
                                         style={{backgroundColor:'white'}}
                                         value={this.state.location} onChange={this.changeLocationHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Contract : </label>
                                  <input placeholder="Contract" name="Contract" className="form-control"
                                         type="text"
                                         style={{backgroundColor:'white'}}
                                         value={this.state.contract} onChange={this.changeContractHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Salary : </label>
                                  <input placeholder="Salary" name="Salary" className="form-control"
                                         style={{backgroundColor:'white'}}
                                         type="text"
                                         value={this.state.salary} onChange={this.changeSalaryHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Description : </label>
                                  <textarea placeholder="Add more details" name="description" className="form-control" rows="6"
                                            value={this.state.description} onChange={this.changeDescriptionHandler}
                                  ></textarea>
                              </div>
                              <button className="btn btn-success" onClick={this.save}>Save</button>

                          </Form>

              </Col>

          </Row>
      </Container>
  </>
);
}
}


export default JobForm;
