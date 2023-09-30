import React, {Component} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import usersServices from "../../services/users.services";
import applicantServices from "../../services/applicantServices";
import ListGroup from 'react-bootstrap/ListGroup';
import {FiMail, FiPhoneCall} from "react-icons/fi";
import {FaBirthdayCake} from 'react-icons/fa';
import adminServices from "../../services/adminServices";
import {Link} from "react-router-dom";
import {forEach} from "react-bootstrap/ElementChildren";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            applicant:[],
            skills:[],
            projects:[],
            educations:[]
        };
    }


    async componentDidMount() {
        const currentUser = usersServices.getCurrentUserA_R();
        if (!currentUser) this.setState({redirect: "/Login"});

        const id = this.props.match.params.id
        this.setState({
            applicant: await adminServices.getUserById(id),
            skills: await applicantServices.getSkillsNamesByApplicant(id),
            projects: await applicantServices.getProjects(id),
            educations: await applicantServices.getEducations(id)
        })


    }
    extractDate(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                // Invalid date string
                return "Invalid Date";
            }
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error("Error parsing date:", error);
            return "Error";
        }
    }


    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }
        /*console.log('user : '+this.state.applicant)
        console.log('Skills : '+this.state.skills)

        console.log('Projects : ')
        this.state.projects.map((p)=>{
            console.log(p)
        })
        console.log('Educations : ')
        this.state.educations.map((p)=>{
            console.log(p)
        })*/
        const recipientEmail = this.state.applicant.email; // Replace with the recipient's email address
        //const subject = "Hello"; // Replace with the desired email subject
        //const body = "This is the email body."; // Replace with the desired email body text
        //  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const mailtoLink = `mailto:${recipientEmail}`;

        return (

            <Container fluid>
                <section style={{ backgroundColor: '#eee' }}>
                    <MDBContainer className="py-5">

                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardImage
                                            src={`/profiles/${this.state.applicant.image}`}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px' }}
                                            fluid />
                                        <p className="text-muted mb-1">{this.state.applicant.fullname}</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <a className="btn btn-primary" href={mailtoLink} >Email me</a>

                                        </div>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBCard className="mb-4 mb-lg-0">
                                    <MDBCardBody className="p-0">
                                        <MDBListGroup flush className="rounded-3">
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">

                                                <MDBCardText><h4>Skills</h4> </MDBCardText>
                                            </MDBListGroupItem>
                                            <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">

                                                <MDBCardText>

                                                    {this.state.skills.map((s,skillIndex)=>(
                                                        <li key={skillIndex} style={{ display: 'inline-block', marginRight: '10px',backgroundColor:'lightgrey',borderRadius:'8px',borderStyle:'solid',borderColor:'white' }}>
                                                            {s}
                                                        </li>
                                                    ))}

                                                </MDBCardText>
                                            </MDBListGroupItem>
                                        </MDBListGroup>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted"> {this.state.applicant.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{this.state.applicant.phone}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />

                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Address</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{this.state.applicant.address}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Birthdate</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{this.extractDate(this.state.applicant.birthDate)}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>

                                <MDBRow>
                                    <MDBCol >
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4">
                                                    <span className="text-primary  me-1"><i className="fas fa-graduation-cap"></i>&nbsp;&nbsp;<b>Education</b>
                                                    </span></MDBCardText>
                                                {this.state.educations.map((s)=>(
                                              <div>
                                                <MDBCardText className="mb-1" >
                                                    <h5>{s.degree}</h5>
                                                    <div style={{fontSize:'12px'}}>
                                                        <b>Academy name :</b> {s.academyName} <br/>
                                                        <b>Major :</b> {s.major}
                                                    </div>
                                                    <div style={{float:'right'}}>{s.startYear}-{s.endYear}</div><br />
                                                </MDBCardText>
                                                    <hr />
                                              </div>
                                                ))}

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    </MDBRow>
                                    <MDBRow>

                                    <MDBCol >
                                        <br />
                                        <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                                <MDBCardText className="mb-4"><span className="text-primary  me-1"><i className="fas fa-project-diagram"></i>&nbsp;&nbsp;<b>Projects</b></span></MDBCardText>
                                                {this.state.projects.map((p)=>(
                                                    <div>
                                                        <MDBCardText className="mb-1" >
                                                            <h5>{p.projectTitle}</h5>
                                                            <div style={{fontSize:'12px'}}>
                                                                <b>Details :</b> {p.details} <br/>
                                                                <b>Technologies :</b> {p.technologies}
                                                            </div>

                                                        </MDBCardText>
                                                        <hr />
                                                    </div>
                                                ))}

                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </Container>

        );
    }
}

export default People;
