import React, {Component, useState} from "react";
import usersServices from "../../services/users.services";

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
import applicantServices from "../../services/applicantServices";
import {date} from "yup";
import {CardHeader} from "reactstrap";


class User extends Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect:null,
      skills: [],
      selectedSkills:[],
      id:'',
      fullname: '',
      email: '',
      password: '',
      address:'',
      phone:'',
      birthdate:'',
      newPassword:'',
      confirmpassword:'',
      gender:'',
      Val:'',
      image:'default.png',
      isEditMode: false,
    }
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeBirthdateHandler = this.changeBirthdateHandler.bind(this);

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
    this.setState({
      skills : await applicantServices.getSkills(),
      selectedSkills : await applicantServices.getSkillsByApplicant(id)
    })

   /* const tabSkills =[]
    const skill = await applicantServices.getSkillsByApplicant(id)
    skill.map((s)=>{
      tabSkills.push(s.name)
    })
    //console.log(tabSkills)
    this.setState({
      selectedSkills : tabSkills
    })*/
    adminServices.getUserById(id)
        .then( (res) =>{
      const dateString = res.birthDate;
      const date = new Date(dateString);
      const formattedDate = date.toISOString().split('T')[0];

      this.setState({
        fullname: res.fullname,
        email: res.email ,
        gender: res.gender ,
        password: res.password,
        address:res.address,
        phone:'0'+res.phone,
        birthdate:formattedDate,
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

  handleInputChange=(e)=>{
    this.setState({Val:e.target.value})
}
  changeAddressHandler= (event) => {
    this.setState({address: event.target.value});

  }
  changePhoneHandler= (event) => {
    this.setState({phone: event.target.value});
  }

  changeBirthdateHandler= (event) => {
    this.setState({birthdate: event.target.value});
    //console.log(this.state.birthdate)
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
     if(this.state.email === '' || this.state.fullname === '' || this.state.address === ''
         || this.state.phone === ''
     ){
       //|| !this.state.birthdate
       toast.error('Make sure that all the fields are filled', {
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
     if(isNaN(this.state.phone) || (this.state.phone).length !== 10){
       toast.error('Unvalid phone number !!', {
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
    request('PUT','admin/applicant/'+this.state.id, {
       fullname: this.state.fullname,
       email: this.state.email,
       address: this.state.address,
       phone: this.state.phone,
       birthDate:this.state.birthdate,
       password: this.state.newPassword,
       gender: this.state.gender,
       image: this.state.image

    }).then((res)=>{

       //console.log(res.data)
       localStorage.setItem("user", JSON.stringify(res.data));
       this.setState({
         confirmpassword: '',
         newPassword: ''

       })

       localStorage.clear() //i added this
       console.log(usersServices.getCurrentUserA_R())
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
  addSkill = () => {

    const skillName = this.state.Val.trim()

    if (skillName !== '' &&  !this.state.selectedSkills.some((skill) => skill.name === skillName)) {

      const matchingSkill = this.state.skills.find((skill) => skill.name === skillName);

      if (matchingSkill) {
        const id = this.state.skills.find((skill) => skill.name === this.state.Val.trim()).id
        applicantServices.addSkill(this.state.id,id ).then(async (res) => {
          this.setState({
            selectedSkills: await applicantServices.getSkillsByApplicant(this.state.id),
            Val: '',
          });
        })
      } else{

        applicantServices.addNewSkill(this.state.id, {name : skillName} ).then(async (res) => {
          this.setState({
            selectedSkills: await applicantServices.getSkillsByApplicant(this.state.id),
            skills : await applicantServices.getSkills(),
            Val: '',
          });
        })
      }

    }
  };

 removeAssignedSkill (id){
   applicantServices.removeSkill(id,this.state.id).then(async (res) => {
     this.setState({
       selectedSkills: await applicantServices.getSkillsByApplicant(this.state.id),
     });
   })
 }
render() {
  if (this.state.redirect) {
    return this.props.history.push(this.state.redirect)
  }
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row>

          <Col md="8">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("../../assets/img/cover.jpg")}
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
                    <div className = "form-group">
                      <label><b> Address :</b> </label>
                      <textarea placeholder="Address" name="address" className="form-control"
                                style={{backgroundColor:'white'}}
                                onChange={this.changeAddressHandler}
                                value={this.state.address}
                                 >{this.state.address}</textarea>
                    </div>
                    <div className = "form-group">
                      <label> <b>Phone :</b> </label>
                      <input placeholder="Phone number" name="phone" className="form-control"
                             type="number"
                             style={{backgroundColor:'white'}}
                             onChange={this.changePhoneHandler}
                             value={this.state.phone} />
                    </div>
                    <div className = "form-group" >
                      <label> <b>Birthdate : </b></label>
                      <input  name="birthdate" className="form-control"
                             type="date"
                             style={{backgroundColor:'white'}}
                             value={this.state.birthdate}
                             onChange={this.changeBirthdateHandler}
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
          <Col md="4">

            <Card className="card-user">
              <CardHeader><b>My Skills</b></CardHeader>
              <hr />
              <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>

                  <input list="data"
                         onChange={this.handleInputChange}
                         onClick={this.addSkill}
                         placeholder="Select a skill"
                         value={this.state.Val}
                  />
                <datalist id="data">
                  {this.state.skills.map((skill, index) => (
                      <option key={index}>{skill.name}</option>
                  ))}
                </datalist>
                <br /><br/>

                <Row xs={{ cols: 1, gutter: 4 }} md={{ cols: 2}}>
                  {this.state.selectedSkills.map((skill, index) => (
                  <Col xs key={index} >
                    <Card key={index} style={{backgroundColor:'lightgrey'}}>
                      <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <span title={skill.name} style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                          &nbsp;{skill.name}</span>
                        <Button variant="link" onClick={() => this.removeAssignedSkill(skill.id)}>
                          <i className="fa fa-times" style={{color:'black'}}></i>
                        </Button>
                      </div>

                    </Card>

                  </Col>
                  ))}
                </Row>

              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
}

export default User;
