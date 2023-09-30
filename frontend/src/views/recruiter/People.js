import React, {Component} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import usersServices from "../../services/users.services";
import applicantServices from "../../services/applicantServices";
import ListGroup from 'react-bootstrap/ListGroup';
import {FiMail, FiPhoneCall} from "react-icons/fi";
import {FaBirthdayCake} from 'react-icons/fa';
import adminServices from "../../services/adminServices";
import {Link} from "react-router-dom";

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:null,
            id:'',
            searchQuery: '',
            applicants:[],
            skillsByApplicant: {},
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
            applicants : await adminServices.getAllApplicants()
        })

        const applicants = await adminServices.getAllApplicants(); // Replace with your data fetching logic

        const skillsByApplicant = {};
        for (const applicant of applicants) {
            skillsByApplicant[applicant.id] = await applicantServices.getSkillsNamesByApplicant(applicant.id);
        }

        this.setState({
            skillsByApplicant:  skillsByApplicant
        })

    }
    extractDate(dateString){
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    // Function to check if any skill matches the search query
    skillsMatch = (query, skills) => {
        if (skills && Array.isArray(skills)) {
            return skills.some((skill) => skill.toLowerCase().includes(query));
        }
        return false;
    };

    render() {
        if (this.state.redirect) {
            return this.props.history.push(this.state.redirect)
        }

        const filteredApplicants = this.state.applicants.filter((app) => {
            const { fullname, phone, email, birthDate } = app;


            const query = this.state.searchQuery.toLowerCase();
            return (
                fullname.toLowerCase().includes(query) ||
                String('0'+phone).includes(query) ||
                email.toLowerCase().includes(query) ||
                birthDate.includes(query) ||
                this.skillsMatch(query, this.state.skillsByApplicant[app.id])
            );

        });
        return (

            <Container fluid>
                <Row>
                    <Col md="12">
                        <div style={{ display: 'flex'}}>

                            <p className="card-category">
                                <input className="text-end" style={{padding: '5px',width:'25em',borderColor:'white',marginLeft:'20em',borderRadius:'10px'}}
                                       type="text"
                                       placeholder="Search . . . "
                                       value={this.state.searchQuery}
                                       onChange={this.handleSearchInputChange}
                                />

                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                {this.state.isLoading ? (
                    <div style={{ textAlign: 'center', marginTop: '7em' }}>Loading...</div>
                ) : (
                <div>
                <Row xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
                {filteredApplicants.map((app,index)=>(
                    <Col xs key={index}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`/profiles/${app.image}`} height="150px"/>
                    <Card.Body>
                        <Card.Title>{app.fullname}</Card.Title>
                        <Card.Text>
                            <b>Skills :</b>
                            {this.state.skillsByApplicant[app.id] && (
                                <section>
                                    {this.state.skillsByApplicant[app.id].map((skill, skillIndex) => (
                                        <li key={skillIndex} style={{ display: 'inline-block', marginRight: '10px',backgroundColor:'lightgrey',borderRadius:'8px',borderStyle:'solid',borderColor:'white' }}>
                                            {skill}
                                        </li>
                                    ))}
                                </section>
                            )}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            < FiPhoneCall  /> 0{app.phone}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            < FiMail /> {app.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FaBirthdayCake /> {this.extractDate(app.birthDate)}
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Link to={`/recruiter/details/${app.id}`}>More details</Link>
                    </Card.Body>
                </Card>
                    </Col>

                ))}
                </Row>
                </div>
                    )}
            </Container>

        );
    }
}

export default People;
