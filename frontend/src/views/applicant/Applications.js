import React, {Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import applicantServices from "../../services/applicantServices";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import Swal from "sweetalert2";
import adminServices from "../../services/adminServices";

class Applications extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            applications:[],
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
            applications : await applicantServices.applicationDetails(id)
        })

    }

extractDate(dateString){
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
     ResumeDownloadLink = ({ fileName }) => {
        const filePath = `/files/${fileName}`;
        return (
            <a href={process.env.PUBLIC_URL + filePath} download>
                Download Resume
            </a>
        );
    };
cancel(idA){

    applicantServices.checkInterviewByApplication(idA).then((res)=>{
        if(res){
            Swal.fire(
                'Unauthorized Action!!',
                'You can not cancel the application, the interview Done!.',
                'warning'

            )
            return false;
        }else{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    applicantServices.cancelApp(idA).then(res=>{
                        this.setState({
                            applications: this.state.applications.filter(a=> a[8] !==idA),
                            //records: this.state.data.filter(u=> u.id !==id)
                        })

                    })
                    Swal.fire(
                        'Deleted!',
                        'The application has been removed.',
                        'success'
                    )
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
                dataField: 'location',
                text: 'Location',
            },
            {
                dataField: 'advertiser',
                text: 'Advertiser',
            },
            {
                dataField: 'email',
                text: 'Email',
            },
            {
                dataField: 'date',
                text: 'Applying date',
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
                dataField: 'status',
                text: 'Status',
                formatter: (cellContent, row) => {
                    let classes =''
                    if(row.status === 'Pending') classes ='warning'
                    if(row.status === 'Selected') classes ='success'
                    if(row.status === 'Unselected') classes ='danger'
                    return (
                        <span className={`badge badge-${classes}`}>
                        {cellContent}
                        </span>
                    );
                },
            },
            {
                dataField: '',
                text: 'Cancel',
                formatter: (cell, row) => (
                    <>
                        <Button className="btn-danger" onClick={() => this.cancel(row.id)} >Cancel</Button>
                    </>
                )
            }
        ];
        const data = []
        this.state.applications.map((a)=>{
           // const s = a[7]===0 ? 'Pendidng' : (a[7] === 1 ? 'Selected' : 'declined' )
            data.push({
                id : a[8],
                positionName : a[0],
                company : a[1],
                location : a[2],
                advertiser: a[3],
                email:a[4],
                date:this.extractDate(a[5]),
                file: a[6],
                status : a[7]===0 ? 'Pending' : (a[7] === 1 ? 'Selected' : 'Unselected' )

            })
        })
        const filteredApplications = data.filter((application) => {
            const { id,positionName, company, location, advertiser, email, date, file, status } = application;
            const query = this.state.searchQuery.toLowerCase();

            // Check if any of the application details match the search query
            return (
                String(id).toLowerCase().includes(query) ||
                positionName.toLowerCase().includes(query) ||
                company.toLowerCase().includes(query) ||
                location.toLowerCase().includes(query) ||
                advertiser.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                date.toLowerCase().includes(query) ||
                file.toLowerCase().includes(query) ||
                status.toLowerCase().includes(query)
            );
        });


        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <div style={{ display: 'flex'}}>
                            <h4>Applications</h4>
                            <p className="card-category">
                                <input className="text-end" style={{padding: '5px',width:'20em',borderColor:'black',marginLeft:'33em'}}
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
                                <div >
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

export default Applications;