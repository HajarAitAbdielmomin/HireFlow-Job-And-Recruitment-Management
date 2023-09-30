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
import {Link} from "react-router-dom";


class Jobs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            jobs:[],

            searchQuery: '',
            isLoading: true,

        };


    }
    handleSearchInputChange = (e) => {
        this.setState({ searchQuery: e.target.value.toLowerCase() });
    };
    async componentDidMount() {
        const currentUser = usersServices.getCurrentUserA_R();
        if (!currentUser) this.setState({redirect: "/Login"});
        const id = currentUser ? currentUser.id : 0
        setTimeout(() => {
            this.setState({ isLoading: false }); // Set isLoading to false after the delay
        }, 1000);

        this.setState({
            id: currentUser ? currentUser.id : 0 ,
            jobs: await recruiterServices.getJobs(id),


        })

    }
    calculateDuration(dateString) {

        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];

        const currentDate = new Date();
        const inputDate = new Date(formattedDate);

        const timeDifference = currentDate - inputDate;
        const secondsDifference = timeDifference / 1000;
        const minutesDifference = secondsDifference / 60;
        const hoursDifference = minutesDifference / 60;
        const daysDifference = hoursDifference / 24;


        if (daysDifference < 1) {
            const hours = Math.floor(hoursDifference);
            if (hours < 1) {
                const minutes = Math.floor(minutesDifference);
                if (minutes < 1) {
                    return `${Math.floor(secondsDifference)} seconds ago`;
                } else {
                    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                }
            } else {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            }
        } else {
            return `${Math.floor(daysDifference)} day${daysDifference > 1 ? 's' : ''} ago`;
        }
    }
    displayDetails(job){

        Swal.fire({
            title: 'Offer details',
            width: '50%',

            html: `
            <hr />
               <div style="text-align: left;color:black">
                
                <h5 style="text-align: left;color:black;text-transform: none" ><b>${(job.positionName)}</b></h5>
                
                <section style="font-size: x-small;color: black; float: left">
                  <li>Company : ${job.companyName} </li>
                  <section style="font-size: x-small">
                    <li>${job.city}</li>  
                  </section>
                  <section style="font-size: x-small">
                     <li>${job.releaseDate}</li>  
                  </section>
                </section>
                
                <br/><br/>
                <div >
                <p style="font-size:12px">${job.description}</p>
         
                
                <section style="font-size: x-small">
                  <li>  Contract : ${job.contract}</li>
                  <li>  Salary : ${job.salary}</li>
                </section>
                
                </div>
               </div>
           `,

        })

    }
    Update(job) {

            Swal.fire({
                title: 'Update data',
                width: '50%',
                html: `
            <b><hr/></b>
            
            <textarea  placeholder="Position name" id="PositionName" class="swal2-input"  
    style="width: 100%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;">${job.positionName}</textarea>
    <textarea  placeholder="Company name" id="CompanyName" class="swal2-input" 
    style="width: 100%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${job.companyName}</textarea>
    <textarea placeholder="Country/city" id="Location" class="swal2-input"  rows="1"
    style="width: 100%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${job.city}</textarea>
    
    <textarea placeholder="Contract" id="Contract" class="swal2-input"    
    style="width: 100%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;">${job.contract}</textarea>
    <textarea placeholder="Salary" id="Salary" class="swal2-input"  
    style="width: 100%;
  height: 50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${job.salary}</textarea>
    <textarea placeholder="Add more details" id="description" class="swal2-input"  rows="1"
    style="width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${job.description}</textarea>
        
                                  
        `,
                confirmButtonText: 'Update',
                showCancelButton: 'Cancel',
                focusConfirm: false,
                preConfirm: () => {
                    const PositionName = Swal.getPopup().querySelector('#PositionName').value;
                    const CompanyName = Swal.getPopup().querySelector('#CompanyName').value;
                    const Location = Swal.getPopup().querySelector('#Location').value;

                    const Contract = Swal.getPopup().querySelector('#Contract').value;
                    const Salary = Swal.getPopup().querySelector('#Salary').value;
                    const description = Swal.getPopup().querySelector('#description').value;

                    if (PositionName === '' || CompanyName === '' || Location === '' || Contract === ''
                        || Salary === '' || description === '')
                         {
                        Swal.showValidationMessage('Please fill in all fields !!');
                        return false;
                    }

                    return {PositionName, CompanyName, Location, Contract, Salary, description}
                }
            }).then( async (result) => {
                if (result.isConfirmed) {
                    recruiterServices.updateJob(job.id,
                        {
                            positionName : result.value.PositionName,
                            description : result.value.description,
                            companyName : result.value.CompanyName,
                            city : result.value.Location,
                            salary : result.value.Salary,
                            contract : result.value.Contract
                        }).then((res) =>{
                        Swal.fire(
                            'Updated successfully!',
                            'Your post has been updated.',
                            'success'
                        )
                        recruiterServices.getJobs(this.state.id).then((res)=>{
                            this.setState({ jobs : res  });
                        })
                    })

                }

            })
    }

    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }
        //console.log(this.state.jobs)
        //console.log(this.state.appliedJobs)
        const filteredJobs = this.state.jobs.filter((job) => {
            const { positionName, companyName, city, salary, contract } = job;
            const query = this.state.searchQuery.toLowerCase();

            // Check if any of the job details match the search query
            return (
                positionName.toLowerCase().includes(query) ||
                companyName.toLowerCase().includes(query) ||
                city.toLowerCase().includes(query) ||
                salary.toLowerCase().includes(query) ||
                contract.toLowerCase().includes(query)
            );
        });

        return(
            <Container fluid>
                <Row>
                    <Col md="12">
                        <div style={{ display: 'flex'}}>
                            <h4>Jobs</h4>
                            <p className="card-category">
                                <input className="text-end" style={{padding: '5px',width:'20em',borderColor:'white',marginLeft:'38em',borderRadius:'10px'}}
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
                {this.state.isLoading ? (
                    <div style={{ textAlign: 'center', marginTop: '7em' }}>Loading...</div>
                ) : (
                    <div>

                        {filteredJobs.map((job, index) => (
                            <Row key={index} >
                            <Col >
                                <Card className="text-left" style={{width:'100%',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderColor:'gray',borderStyle:'outset'}}>
                                    <CardHeader style={{backgroundColor:'lightblue',color:'white'}}><b>{job.positionName}</b> </CardHeader>
                                    <CardBody >
                                        <CardTitle><strong>Company :</strong> {job.companyName} </CardTitle>
                                        <CardText>{job.city}<br /> {job.contract}
                                            <br/>
                                            <div style={{float:'right'}}>
                                                <Button onClick={() => this.displayDetails(job)} className="btn-info">Details</Button>
                                                <span  style={{ marginRight: '10px' }}></span>
                                                <Button
                                                    onClick={() => this.Update(job)}
                                                    className="btn-warning"
                                                >
                                                    Update
                                                </Button>

                                                <span  style={{ marginRight: '10px' }}></span>
                                                <Link
                                                    to={`/recruiter/apps/${job.id}`}
                                                    className="btn btn-success"
                                                >
                                                    View applicants
                                                </Link>
                                                <span  style={{ marginRight: '10px' }}></span>
                                                <Link
                                                    to={`/recruiter/interviews/${job.id}`}
                                                    className="btn btn-dark"
                                                >
                                                    View interviews
                                                </Link>
                                            </div>
                                        </CardText>

                                    </CardBody>
                                    <CardFooter className="text-medium-emphasis" style={{backgroundColor:'lightblue',color:'white'}}>Posted {this.calculateDuration(job.releaseDate)}</CardFooter>
                                </Card>
                            </Col>
                            </Row>
                        ))}

                    </div>
                )}
            </Container>
        )
    }
}

export default Jobs;