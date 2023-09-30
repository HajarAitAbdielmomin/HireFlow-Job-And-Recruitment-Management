import React, {Component} from "react";
import usersServices from "../../services/users.services";
import CryptoJS from "crypto-js";

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import adminServices from "../../services/adminServices";
import {request} from "../../services/axios_helper";
import {toast, ToastContainer} from "react-toastify";
import {FaEdit} from "react-icons/fa";



class User extends Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect:null,

      id:'',
      fullname: '',
      email: '',
      password: '',

      newPassword:'',
      confirmpassword:'',
      gender:'',

      image:'default.png',
      isEditMode: false,
    }
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
    this.changeGenderHandler = this.changeGenderHandler.bind(this);
    this.changeImageHandler = this.changeImageHandler.bind(this);
    this.update= this.update.bind(this);
    this.openImagePicker = this.openImagePicker.bind(this);
  }

  async componentDidMount() {
    const currentUser = usersServices.getCurrentUserA_R();
    //console.log(currentUser)
    if (!currentUser) this.setState({redirect: "/Login"});
    else{
    //console.log(currentUser)
    const id = usersServices.getCurrentUserA_R()
        ? usersServices.getCurrentUserA_R().id : 0

    adminServices.getUserById(id)
        .then( (res) =>{

      this.setState({
        fullname: res.fullname,
        email: res.email ,
        gender: res.gender ,
        password: res.password,
        image: res.image ? res.image : 'default.png',
        id:res.id
      })
    })

    }
  }

  openImagePicker = () => {
    if (this.imageInput) {
      this.imageInput.click();
    }
  };

  changeImageHandler= (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      // Update the image state with the selected image
      this.setState({ image: selectedImage.name });

    }
  }



  changeFullNameHandler= (event) => {
    this.setState({fullname: event.target.value});
    //console.log(this.state.fullname)
  }
  changeEmailHandler= (event) => {
    this.setState({email: event.target.value});
  }

  changePasswordHandler= (event) => {
    this.setState({newPassword: event.target.value});
    //console.log(this.state.password)
  }

  changeConfirmPasswordHandler= (event) => {
    this.setState({confirmpassword: event.target.value});
    //console.log(this.state.confirmpassword)
  }
  changeGenderHandler= (event) => {
    this.setState({gender: event.target.value});
  }

  toggleEditMode = () => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode,
    }));
  };

  update= (e) => {
     e.preventDefault();
     if(this.state.email === '' || this.state.fullname === '')
     {
       toast.error('Please fill in the fullname and email fields', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       return false;
     }
     if(this.state.newPassword === '' || this.state.confirmpassword === ''){
       this.setState({
         newPassword : this.state.password
       })
     }
     if(this.state.newPassword !== this.state.confirmpassword){
       toast.warn('Passwords do not match', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       this.setState({
         newPassword: '',
         confirmpassword: ''
       })
       return;
     }

    //console.log(this.state.image)
    request('PUT','admin/users/'+this.state.id, {

       fullname: this.state.fullname,
       email: this.state.email,
       password: this.state.newPassword,
       gender: this.state.gender,
       image: this.state.image

    }).then((res)=>{

       localStorage.clear()
       localStorage.setItem("user", JSON.stringify(res.data));

       this.setState({
         confirmpassword: '',
         newPassword: ''

       })
       //console.log('after'+usersServices.getCurrentUserA_R())
       toast.success('Profile updated !!', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });

     })
   }


render() {
  if (this.state.redirect) {
    return this.props.history.push(this.state.redirect)
  }
console.log(usersServices.getCurrentUserA_R())
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row>
         <Col md="2">
         </Col>
          <Col md="8">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("../../assets/img/rec.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">

                    <div className="avatar-container">
                      <input
                          type="file"
                          accept="image/*"
                          onChange={this.changeImageHandler}
                          style={{ display: 'none' }}
                          ref={(input) => (this.imageInput = input)}
                      />
                      <img
                          alt="..."
                          className="avatar border-gray"
                          src={`/profiles/${this.state.image}`}
                          onClick={this.openImagePicker}
                      />
                      {this.state.isEditMode && (
                          <div className="edit-icon-container">
                            <FaEdit className="edit-icon"  onClick={this.toggleEditMode}  />
                          </div>
                      )}
                    </div>
                  <Form className="-align-center" >
                    <div className = "form-group">
                      <label><b> Full Name: </b></label>
                      <input placeholder="Fullname" name="firstName" className="form-control"
                             type="text"
                             style={{backgroundColor:'white'}}
                             value={this.state.fullname}
                             onChange={this.changeFullNameHandler}
                      />
                    </div>
                    <div className = "form-group">
                      <label><b> Email : </b></label>
                      <input placeholder="Email Address" name="emailId" className="form-control"
                             type="email"
                             style={{backgroundColor:'white'}}
                             value={this.state.email}
                             onChange={this.changeEmailHandler}
                      />
                    </div>


                    <h5>Update password</h5>
                    <Row>
                      <Col md="6">
                        <div className = "form-group">

                          <label> Password : </label>
                          <input placeholder="New Password" name="lastName" className="form-control"
                                 type="password"
                                 onChange={this.changePasswordHandler}
                                 value={this.state.newPassword} />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className = "form-group">
                          <label> Confirm Password : </label>
                          <input placeholder="Confirm Password" name="lastName" className="form-control"
                                 type="password"
                                 onChange={this.changeConfirmPasswordHandler}
                                 value={this.state.confirmpassword} />
                        </div>
                      </Col>
                    </Row>

                    <div className="form-group">
                      <label>Change gender :</label>
                      <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            value="F"
                            onChange={this.changeGenderHandler}
                            checked={this.state.gender === "F"}

                        />
                        <label className="form-check-label">Female</label>
                      </div>
                      <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="gender"
                            value="M"
                            onChange={this.changeGenderHandler}
                            checked={this.state.gender === "M"}

                        />
                        <label className="form-check-label">Male</label>
                      </div>
                    </div>

                    <button className="btn btn-success" onClick={this.update}>Update data</button>

                  </Form>



                </div>

              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="www.linkedin.com/in/hajar-ait-abdielmomin-98638421b"
                  variant="link"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-github"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>


      </Container>
    </>
  );
}
}

export default User;
