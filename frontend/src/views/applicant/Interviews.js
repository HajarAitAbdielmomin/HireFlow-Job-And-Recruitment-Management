import React, {Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import applicantServices from "../../services/applicantServices";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import Swal from "sweetalert2";
import adminServices from "../../services/adminServices";

class Interviews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            interviews:[],
            searchQuery: '',
        };
    }

    handleSearchInputChange = (e) => {
        this.setState({ searchQuery: e.target.value.toLowerCase() });
    };
    async componentDidMount() {
        const currentUser = usersServices.getCurrentUserA_R();
        if (!currentUser) this.setState({redirect: "/Login"});
        const id = currentUser ? currentUser.id : 0


        this.setState({
            id: currentUser ? currentUser.id : 0 ,
            interviews : await applicantServices.getInterviews(id)
        })



    }

    extractDate(dateString){
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

confirm(idI, state){

        applicantServices.checkInterview(idI).then((res)=>{
            if(res){
                Swal.fire(
                    'Unauthorized Action!!',
                    'You can not cancel your attendance, the interview Done!.' +
                    `<br /><br /><a href="/applicant/result/${idI}">View Result here</a>`,
                    'warning'
                )
                return false;
            } else{


                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, release it!'
                }).then((res) =>{
                    if (res.isConfirmed) {
                        applicantServices.setAttendence(idI,{
                            attendance : state
                        }).then((res)=>{
                            if(state){
                                Swal.fire(
                                    'Confirmed!',
                                    'You have confirmed your attendance !.',
                                    'success'
                                )
                            }else{
                                Swal.fire(
                                    'Canceled!',
                                    'You have canceled your attendance !.',
                                    'success'
                                )
                            }
                            applicantServices.getInterviews(this.state.id).then((res)=>{
                                this.setState({
                                    interviews : res
                                })
                            })
                        })
                    }
                })

            }
        })



}
    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }


      const columns = [
            {
                dataField: 'id',
                text: 'id',
            },
            {
                dataField: 'positionName',
                text: 'Position name',
            },
            {
                dataField: 'company',
                text: 'Company',
            },
          {
              dataField: 'interviewDate',
              text: 'Interview date',
          },
            {
                dataField: 'location',
                text: 'Location',
            },

            {
                dataField: '',
                text: 'Actions',
                formatter: (cellContent, row) => {
                    let classes ='warning'
                    let text ='Confirm attendence'
                    let state = true

                       if(row.attendance){
                        classes ='danger'
                        text = 'Cancel attendence'
                        state = false
                           return (
                               <Button className={`btn-${classes}`} onClick={() => this.confirm(row.id,state)} >{text}</Button>
                           );
                       }else{
                           return (
                               <Button className={`btn-${classes}`} onClick={() => this.confirm(row.id,state)} >{text}</Button>
                           );
                       }

                },

            },


        ];
        const data = []
        this.state.interviews.map((a)=>{
            data.push({
                id : a[0],
                positionName : a[1],
                company : a[2],
                interviewDate: this.extractDate(a[3]),
                location:a[4],
                attendance : a[5],

            })


        })

        const filteredApplications = data.filter((application) => {
            const { id,positionName, company, interviewDate,location } = application;
            const query = this.state.searchQuery.toLowerCase();

            // Check if any of the application details match the search query
            return (
                String(id).toLowerCase().includes(query) ||
                positionName.toLowerCase().includes(query) ||
                company.toLowerCase().includes(query) ||
                location.toLowerCase().includes(query) ||
                String(interviewDate).toLowerCase().includes(query)

            );
        });


        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <div style={{ display: 'flex'}}>
                            <h4>Scheduled interviews</h4>
                            <p className="card-category" style={{width:'40%'}}>
                                <input className="text-end" style={{padding: '5px',width:'20em',borderColor:'black',marginLeft:'25em'}}
                                       type="text"
                                       placeholder="Search . . . "
                                       value={this.state.searchQuery}
                                       onChange={this.handleSearchInputChange}
                                />

                            </p>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md="12">

                        <Card.Body className="table-full-width table-responsive px-0">
                            <div style={{ maxHeight: '400px',overflowY: 'auto'}}>
                                <BootstrapTable
                                    classes="table-hover table-striped"
                                    keyField="id"
                                    data={filteredApplications}
                                    columns={columns}
                                    filter={filterFactory()}
                                />
                            </div>
                        </Card.Body>

                    </Col>

                </Row>
            </Container>
        )
    }
}

export default Interviews;