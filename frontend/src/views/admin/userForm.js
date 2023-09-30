import React, {Component} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import usersServices from "../../services/users.services";
import {request} from 'services/axios_helper';
import {toast, ToastContainer} from "react-toastify";

class UserForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            redirect:null,
            fullName: '',
            email: '',
            password: '',
            confirmpassword:'',
            gender:'',
            role:'recruiter',
        }
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount(){
        const currentUser = usersServices.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/authenticate" });

    }
     save = async (e) => {
        e.preventDefault();

        if(this.state.gender === '' || this.state.fullName === '' ||
            this.state.email === '' || this.state.password === '' || this.state.confirmpassword === ''
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

        if(this.state.password !== this.state.confirmpassword){
            toast.warn('Passwords not matching !', {
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

        let user = {fullName: this.state.fullName, email: this.state.email, role: this.state.role,password: this.state.password,gender:this.state.gender};
        console.log('user => ' + JSON.stringify(user));

         try{
             const response =  await request("POST", "/signup", {fullname: this.state.fullName, email: this.state.email, role: this.state.role,password: this.state.password,gender:this.state.gender});

            if (response) {
                this.clearForm()
                toast.success(response.data.message, {
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
            toast.error('Registration Failed !!', {
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
            fullName: "",
            email: "",
            role: "recruiter",
            password: "",
            confirmpassword: "",
            gender: "",
        });
    }
    changeRoleHandler= (event) => {
        this.setState({role: event.target.value});
    }
    changeFullNameHandler= (event) => {
        this.setState({fullName: event.target.value});

    }
    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeConfirmPasswordHandler= (event) => {
        this.setState({confirmpassword: event.target.value});
    }
    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
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
                  <Card>
                      <Card.Header>
                          <Card.Title as="h4">Add User</Card.Title>
                      </Card.Header>
                      <Card.Body>
                          <Form className="-align-center" >
                              <div className = "form-group">
                                  <label> Full Name: </label>
                                  <input placeholder="Fullname" name="firstName" className="form-control"
                                         type="text"
                                         value={this.state.fullName} onChange={this.changeFullNameHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Email Id: </label>
                                  <input placeholder="Email Address" name="emailId" className="form-control"
                                         type="email"
                                         value={this.state.email} onChange={this.changeEmailHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Password : </label>
                                  <input placeholder="Password" name="lastName" className="form-control"
                                         type="password"
                                         value={this.state.password} onChange={this.changePasswordHandler}/>
                              </div>
                              <div className = "form-group">
                                  <label> Confirm Password : </label>
                                  <input placeholder="Confirm Password" name="lastName" className="form-control"
                                         type="password"
                                         value={this.state.confirmpassword} onChange={this.changeConfirmPasswordHandler}/>
                              </div>
                              <div className="form-group">
                                  <label>User type :</label>
                                  <select
                                      className="form-control"
                                      value={this.state.role}
                                      onChange={this.changeRoleHandler}

                                  >
                                      <option value="recruiter">Recruiter</option>
                                      <option value="applicant" >Applicant</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label>Choose a gender :</label>
                                  <div className="form-check">
                                      <input
                                          type="radio"
                                          className="form-check-input"
                                          name="gender"
                                          value="F"
                                          checked={this.state.gender === "F"}
                                          onChange={this.changeGenderHandler}
                                      />
                                      <label className="form-check-label">Female</label>
                                  </div>
                                  <div className="form-check">
                                      <input
                                          type="radio"
                                          className="form-check-input"
                                          name="gender"
                                          value="M"
                                          checked={this.state.gender === "M"}
                                          onChange={this.changeGenderHandler}
                                      />
                                      <label className="form-check-label">Male</label>
                                  </div>
                              </div>

                              <button className="btn btn-success" onClick={this.save}>Save</button>

                          </Form>
                      </Card.Body>
                  </Card>
              </Col>

          </Row>
      </Container>
  </>
);
}
}


export default UserForm;
