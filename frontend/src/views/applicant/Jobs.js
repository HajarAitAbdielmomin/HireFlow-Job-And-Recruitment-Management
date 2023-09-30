import React,{Component} from "react";
import usersServices from "../../services/users.services";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, CardFooter, CardHeader, CardText, CardTitle} from "reactstrap";
import {FaItalic} from "react-icons/fa";
import applicantServices from "../../services/applicantServices";
import adminServices from "../../services/adminServices";
import Swal from "sweetalert2";
import {request} from "../../services/axios_helper";


class Jobs extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            jobs:[],
            appliedJobs:[],
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
            jobs: await applicantServices.getJobDetails(),
            appliedJobs : await applicantServices.appliedJobs(id)
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
displayDetails(job,recName,recEmail){

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
                <hr/>
                <section style="font-size: x-small; float: right">
                 <b> Advertiser :</b><br />
                  <li>${recName}</li>
                  <li>${recEmail}</li>
                </section>
                
                </div>
               </div>
           `,

        })

    }
 apply(idJ) {

    if (this.state.appliedJobs.includes(idJ)) {


    } else {
        Swal.fire({
            title: 'Apply for the job',
            width: '50%',
            html: `
            <b><hr/></b>
              <section>
                 <h5 style="text-transform: none;float: left">Upload cv :</h5>
                 <input type="file" id="resume" style="margin-right: -3em;"/>
              </section>
            <br/><br/>
             <textarea id="details" class="swal2-input" placeholder="Add some details" 
                 style="width: 100%;height: 85px; padding: 12px 20px; box-sizing: border-box;border-radius: 4px;
                 background-color: white;font-size: 16px;overflow-y: auto;resize: none;"></textarea>
        `,
            confirmButtonText: 'Apply',
            showCancelButton: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                let resume = Swal.getPopup().querySelector('#resume').value;
                const details = Swal.getPopup().querySelector('#details').value;

                if (resume === '') {
                    Swal.showValidationMessage('Upload your resume!!');
                    return false;
                }
                if (resume.match(/fakepath/)) {
                    // update the file-path text using case-insensitive regex
                    resume = resume.replace(/C:\\fakepath\\/i, '');
                }

                return {resume, details}
            }
        }).then( async (result) => {
            if (result.isConfirmed) {
                applicantServices.apply(idJ, this.state.id,
                    {
                        details: result.value.details,
                        resumeFile: result.value.resume
                    }).then((res) =>{
                    Swal.fire(
                        'Applied successfully!',
                        'Your application was sent.',
                        'success'
                    )
                    applicantServices.appliedJobs(this.state.id).then((res)=>{
                        this.setState({ appliedJobs : res  });
                    })
                })

            }

            //console.log(this.state.appliedJobs)

        })


    }
}
    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }
        //console.log(this.state.jobs)
        //console.log(this.state.appliedJobs)
        const filteredJobs = this.state.jobs.filter((job) => {
            const { positionName, companyName, city, salary, contract } = job[0];
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
                <Row key={index}>
                    <Card className="text-left" style={{width:'100%',boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderColor:'gray',borderStyle:'outset'}}>
                        <CardHeader style={{backgroundColor:'#F1F2F3'}}><b>{job[0].positionName}</b> </CardHeader>
                        <CardBody >
                            <CardTitle><strong>Company :</strong> {job[0].companyName} </CardTitle>
                            <CardText>{job[0].city}<br /> {job[0].contract}
                                <br/>
                                <div style={{float:'right'}}>
                                    <Button onClick={() => this.displayDetails(job[0],job[1],job[2])} className="btn-info">Details</Button>
                                    <span  style={{ marginRight: '10px' }}></span>
                                    <Button
                                        onClick={() => this.apply(job[0].id)}

                                        className={this.state.appliedJobs.includes(job[0].id) ? "btn btn-outline-info" : "btn-success"}
                                        disabled={this.state.appliedJobs.includes(job[0].id)} >
                                        {this.state.appliedJobs.includes(job[0].id) ? "Applied" : "Apply"}
                                    </Button>
                                </div>
                            </CardText>

                        </CardBody>
                        <CardFooter className="text-medium-emphasis" style={{backgroundColor:'#F1F2F3'}}>Posted {this.calculateDuration(job[0].releaseDate)}</CardFooter>
                    </Card>
                </Row>
                ))}
                </div>
                    )}
            </Container>
        )
    }
}

export default Jobs;