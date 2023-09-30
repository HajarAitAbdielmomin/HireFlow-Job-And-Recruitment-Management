import React, {Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import applicantServices from "../../services/applicantServices";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import Swal from "sweetalert2";
import adminServices from "../../services/adminServices";
import recruiterServices from "../../services/recruiterServices";

class Interviews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            idJ:'',
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
            idJ: this.props.match.params.id,
            interviews: await recruiterServices.getInterviewsByJob(this.props.match.params.id)
        })

    }

    extractDate(dateString){
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    setResult(idI){
     recruiterServices.getInterviewById(idI).then((res)=>{
         const interviewDate = new Date(res.interviewDate); // Assuming interview.date is the date of the interview in ISO string format

         // Get the current system date
         const currentDate = new Date();
         if(interviewDate >= currentDate){
             Swal.fire(
                 'Attention !',
                 'The interview has not done yet !!.',
                 'warning'
             )
         }else{
             recruiterServices.getResultByInterview(idI).then((res)=>{

             if(res && typeof res.data !== 'undefined' && res.data !== ''){
                 Swal.fire({
                     title: '*The result is already set*',
                     html:
                         `
                  <h5 style="text-align: center"> Update : </h5>
                 <textarea type="text" id="resultInterview" class="swal2-input" placeholder="Your dicision"
                 style="width: 100%;height: 85px; padding: 12px 20px; box-sizing: border-box;border-radius: 4px;
                 background-color: white;font-size: 16px;overflow-y: auto;resize: none;"
                 >${res.response}</textarea>
                <select id="status" class="swal2-input" >
                 <option >${res.result}</option>
                 
                  <option >${res.result  === 'Hired' ? 'Not Hired' : 'Hired'}</option>
                                      
                </select>
              
                `,
                     confirmButtonText: 'Submit',
                     showCancelButton: 'Cancel',
                     focusConfirm: false,
                     preConfirm: () => {
                         const resultInterview = Swal.getPopup().querySelector('#resultInterview').value;
                         const status = Swal.getPopup().querySelector('#status').value;
                         if (status === '') {
                             Swal.showValidationMessage('Choose a status please!!');
                             return false;
                         }
                         return {resultInterview, status}
                     }
                 }).then((result) => {
                     if (result.isConfirmed) {
                         recruiterServices.updateResult(res.id, {
                             response: result.value.resultInterview,
                             result: result.value.status
                         }).then((res) => {
                             Swal.fire(
                                 'Updated',
                                 'Your decision was sent.',
                                 'success'
                             )
                         })
                     }
                 })
             }else {
                 Swal.fire({
                     title: 'Interview result',
                     html:
                         `
                 <textarea type="text" id="resultInterview" class="swal2-input" placeholder="Your dicision"
                 style="width: 100%;height: 85px; padding: 12px 20px; box-sizing: border-box;border-radius: 4px;
                 background-color: white;font-size: 16px;overflow-y: auto;resize: none;"
                 ></textarea>
                 <select id="status" class="swal2-input" >
                 <option value=""></option>
                                      <option value="Hired">Hired</option>
                                      <option value="Not Hired" >Not Hired</option>
                                  </select>
                `,
                     confirmButtonText: 'Submit',
                     showCancelButton: 'Cancel',
                     focusConfirm: false,
                     preConfirm: () => {
                         const resultInterview = Swal.getPopup().querySelector('#resultInterview').value;
                         const status = Swal.getPopup().querySelector('#status').value;
                         if (status === '') {
                             Swal.showValidationMessage('Choose a status please!!');
                             return false;
                         }
                         return {resultInterview, status}
                     }
                 }).then((result) => {
                     if (result.isConfirmed) {
                         recruiterServices.addResult(idI, {
                             response: result.value.resultInterview,
                             result: result.value.status
                         }).then((res) => {

                             Swal.fire(
                                 '',
                                 'Your decision was sent.',
                                 'success'
                             )
                         })
                     }
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


        const data = []
        this.state.interviews.map((i)=>{
            data.push({
                id : i[0],
                fullname : i[1],
                email : i[2],
                InterviewDate : this.extractDate(i[3]),
                attendance: i[4],

            })
        })

        const columns = [
            {
                dataField: 'id',
                text: 'id',
            },
            {
                dataField: 'fullname',
                text: 'Fullname',
            },
            {
                dataField: 'email',
                text: 'Email',
            },
            {
                dataField: 'InterviewDate',
                text: 'Interview Date',
            },
            {
                dataField: 'attendance',
                text: 'Attendence',
                formatter: (cellContent, row) => {
                    let classes =''
                    let status =''
                    if(row.attendance){
                        classes ='success'
                        status = 'Confirmed'
                    }
                    if(!row.attendance){
                        classes ='danger'
                        status = 'Not confirmed'
                    }
                    return (
                        <span className={`badge badge-${classes}`}>
                        {status}
                        </span>
                    );
                },
            },


            {
                dataField: '',
                text: '',
                formatter: (cell, row) => (

                    <>
                        <Button className="btn-warning" onClick={() => this.setResult(row.id)} >Set interview result</Button>
                    </>
                )
            }
        ];


        const filteredInterviews= data.filter((application) => {
            const { id,fullname, email, InterviewDate, attendance } = application;
            const query = this.state.searchQuery.toLowerCase();

            return (
                String(id).toLowerCase().includes(query) ||
                fullname.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                InterviewDate.toLowerCase().includes(query) ||
                String(attendance).toLowerCase().includes(query)
            );
        });


        return(
            <Container fluid>
                {data.length <= 0 ? (
                    <h4 style={{textAlign:'center',marginTop:'15%'}}>No Interview has scheduled for this job !!!</h4>
                ) : (
                <div>
                <Row>
                    <Col md="12">
                        <div style={{ display: 'flex'}}>
                            <h4>Scheduled interviews</h4>
                            <p className="card-category">
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
                                    data={filteredInterviews}
                                    columns={columns}
                                    filter={filterFactory()}
                                />
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
                </div>
                    )}
            </Container>
        )
    }
}

export default Interviews;