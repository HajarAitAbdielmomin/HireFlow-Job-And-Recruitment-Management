import React,{Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, CardFooter, CardHeader, CardText, CardTitle} from "reactstrap";
import {FaEdit, FaItalic, FaTrash} from "react-icons/fa";
import applicantServices from "../../services/applicantServices";
import adminServices from "../../services/adminServices";
import Swal from "sweetalert2";
import {request} from "../../services/axios_helper";
import recruiterServices from "../../services/recruiterServices";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";


class ApplicantsDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            idJ:'',
            searchQuery: '',
            detailsApplicants:[]
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
          id : id,
          idJ: this.props.match.params.id,
          detailsApplicants : await recruiterServices.getApplicantsForEachJob(this.props.match.params.id)
      })

    }

    viewDetails(idApplication){

        this.state.detailsApplicants.map((a)=>{
            if(a[0].id === idApplication){
                Swal.fire({
                    title: 'Application details',
                    html:
                        `
           <b> <hr/> </b>
           <h5 style="float: left;color: cornflowerblue;text-transform: none"><b>Applicant's personal information :</b></h5><br /><br />
          <div style="text-transform: none;font-size: 15px;color: black">
            <b style="margin-left: -40%">Fullname :</b> ${a[1].fullname}<br />
            <b style="margin-left: -39%">Email :</b> ${a[1].email}<br />
            <b style="margin-left: -60%">Gender :</b>  ${a[1].gender === 'F' ? 'Female' : 'Male'}<br />
            <b style="margin-left: -22%">Address :</b> ${a[1].address}<br />
            <b style="margin-left: -48%">Birthday :</b> ${this.extractDate(a[1].birthDate)}<br />
            <b style="margin-left: -35%">Phone number :</b> 0${a[1].phone}<br />
          </div>
          <br />
          
            <h5 style="float: left;color: cornflowerblue;text-transform: none"><b>Application : </b></h5><br /><br />
            <div style="text-transform: none;font-size: 15px;color: black">
            <b style="">Application date :</b> ${this.extractDate(a[0].applicationDate)}
           <br/>
            <b style="">Details :</b><p>${a[0].details}</p>
          </div>        
`,

                })
            }
        })

    }
    extractDate(dateString){
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    schedule(idApplication){
        let idApplicant = 0
        this.state.detailsApplicants.map((a)=>{
            if(a[0].id === idApplication) {
                idApplicant = a[1].id
            }
        })
    recruiterServices.checkExistence(idApplication).then((res)=>{
        if(res){
            Swal.fire(
                'Unauthorized action',
                'This interview is done',
                'warning'
            )
        }else {
            recruiterServices.check(this.state.idJ, idApplicant).then((res)=>{
                //console.log('state : '+res.data)
                if(res.data){

                    recruiterServices.getInterview(this.state.idJ,idApplicant).then((res)=>{
                        const dateString = res.interviewDate;
                        const date = new Date(dateString);
                        const formattedDate = date.toISOString().split('T')[0];
                        Swal.fire({
                            title: 'You have already scheduled the interview !!!',
                            html:
                                `
                   <h5 style="text-align: center;text-transform: none">Update the date</h5>
                 <input type="date" id="timing" class="swal2-input"  value="${formattedDate}"/>
                `,
                            confirmButtonText: 'Update',
                            focusConfirm: false,
                            preConfirm: () => {
                                const interviewDate = Swal.getPopup().querySelector('#timing').value;

                                if (!interviewDate) {
                                    Swal.showValidationMessage('Please select a date.');
                                    return false;
                                }
                                const currentDate = new Date().toISOString().split('T')[0];

                                if (interviewDate === currentDate) {
                                    Swal.showValidationMessage('Please select a date that is not the current date.');
                                    return false;
                                }
                                if (interviewDate < currentDate) {
                                    Swal.showValidationMessage('Please select a future date.');
                                    return false;
                                }
                                return {interviewDate}
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {

                                recruiterServices.updateInterview(res.id,
                                    {
                                        interviewDate : result.value.interviewDate
                                    }
                                ).then((res) =>{
                                    Swal.fire(
                                        'Updated!',
                                        'The interview scheduled successfully !!.',
                                        'success'
                                    )
                                })
                            }
                        });


                    })

                    return false;
                } else {
                    Swal.fire({
                        title: 'Add an interview',
                        html:
                            `
                 <input type="date" id="timing" class="swal2-input" />
                `,
                        confirmButtonText: 'Add',
                        focusConfirm: false,
                        preConfirm: () => {
                            const interviewDate = Swal.getPopup().querySelector('#timing').value;

                            if (!interviewDate) {
                                Swal.showValidationMessage('Please select a date.');
                                return false;
                            }
                            const currentDate = new Date().toISOString().split('T')[0];

                            if (interviewDate === currentDate) {
                                Swal.showValidationMessage('Please select a date that is not the current date.');
                                return false;
                            }
                            if (interviewDate < currentDate) {
                                Swal.showValidationMessage('Please select a future date.');
                                return false;
                            }
                            return {interviewDate}
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {

                            recruiterServices.scheduleInterview(this.state.idJ,idApplicant,
                                {
                                    interviewDate : result.value.interviewDate
                                }
                            ).then((res) =>{
                                Swal.fire(
                                    'Added!',
                                    'The interview scheduled successfully !!.',
                                    'success'
                                )
                            })
                        }
                    });
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
        this.state.detailsApplicants.map((a)=>{
            data.push({
                id : a[0].id,
                fullName : a[1].fullname,
                email : a[1].email,
                gender : a[1].gender,
                file: a[0].resumeFile,

            })
        })

        const columns = [
            {
                dataField: 'id',
                text: 'id',
            },
            {
                dataField: 'fullName',
                text: 'full name',
            },
            {
                dataField: 'email',
                text: 'email',
            },
            {
                dataField: 'gender',
                text: 'gender',
            },

            {
                dataField: 'file',
                text: 'Resume',
                formatter: (cellContent, row) => {
                    const resumeURL = `${process.env.PUBLIC_URL}/files/${row.file}`; // Replace with the actual path

                    return (
                        <a href={resumeURL} target="_blank" rel="noopener noreferrer">
                            {row.file}
                        </a>
                    );
                },

            },

            {
                dataField: '',
                text: 'Actions',
                formatter: (cell, row) => (
                    <>
                        <Button className="btn-info" onClick={() => this.viewDetails(row.id)} >Details</Button>
                        <span  style={{ marginRight: '10px' }}></span>
                        <Button className="btn-success" onClick={() => this.schedule(row.id)} >Schedule interview</Button>

                    </>
                ),

            }
        ];
        const filteredApplicants= data.filter((application) => {
            const { id,fullName, email, gender, file } = application;
            const query = this.state.searchQuery.toLowerCase();

            return (
                String(id).toLowerCase().includes(query) ||
                fullName.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                gender.toLowerCase().includes(query) ||
                String(file).toLowerCase().includes(query)
            );
        });
    return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        {data.length <= 0 ? (
                            <h4 style={{textAlign:'center',marginTop:'15%'}}>No one requested yet !!!</h4>
                        ) : (
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h4">Applicants for this job</Card.Title>
                                <p className="card-category">

                                    <input className="text-end" style={{padding:'5px', float:'right', borderRadius:'8px'}}
                                           type="text" placeholder="Search . . . "  value={this.state.searchQuery}
                                           onChange={this.handleSearchInputChange} />

                                </p>

                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">


                                <BootstrapTable
                                    wrapperClasses="table-responsive"
                                    classes="table-hover table-striped"
                                    keyField="id"
                                    data={filteredApplicants}// Replace with your actual data array
                                    columns={columns} // Replace with your actual columns array
                                    filter={filterFactory()}
                                />

                            </Card.Body>
                        </Card>
                        )}
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default ApplicantsDetails;