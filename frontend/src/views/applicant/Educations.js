import React, {Component} from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col, Button,
} from "react-bootstrap";

import '../../assets/css/icons.css';
import usersServices from "../../services/users.services";
import Swal from "sweetalert2";
import {CardBody, CardGroup, CardHeader, CardLink, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import study from 'assets/img/study.webp'
import applicantServices from "../../services/applicantServices";
import adminServices from "../../services/adminServices";

const currentYear = new Date().getFullYear();

class Educations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect:null,
      id:'',
      educations:[],
      searchQuery: '',
      isLoading: true
    };


  }
  handleSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  async componentDidMount() {
    const currentUser = usersServices.getCurrentUserA_R();

    if (!currentUser) this.setState({ redirect: "/Login" });

    else {

      this.setState({
        id : currentUser ? currentUser.id : 0,
        educations: await applicantServices.getEducations(currentUser ? currentUser.id : 0)
      })
      setTimeout(() => {
        this.setState({ isLoading: false }); // Set isLoading to false after the delay
      }, 1000);
    }

  }
  generateYearOptions = (startYear, endYear) => {
    let options = '';
    for (let year = startYear; year <= endYear; year++) {
      options += `<option value="${year}">${year}</option>`;
    }
    return options;
  }

//////Update
  generateOldYearOptions(startYear, endYear, selectedYear) {
    let options = '';
    for (let year = startYear; year <= endYear; year++) {
      options += `<option value="${year}" ${year === selectedYear ? 'selected' : ''}>${year}</option>`;
    }
    return options;
  }

  displayUpdateForm(id){
    applicantServices.getEducation(id).then( (res) => {
      Swal.fire({
        title: 'Update Education',
        html:
            `
           <b><hr/></b>
    <textarea type="text"  id="academyname" class="swal2-input" placeholder="Academy Name"   
    style="width: 80%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;">${res.academyName}</textarea>
    <textarea id="degree" class="swal2-input" placeholder="Degree" rows="1"
    style="width: 80%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${res.degree}</textarea>
    <textarea id="major" class="swal2-input" placeholder="Major" rows="1"
    style="width: 80%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${res.major}</textarea>
<br><br>
    <div class="swal2-input-group" style=" display: flex; margin-left: 3em" >
 <select class="swal2-input col-md-5" id="startyear" style="flex: 1;margin-right: 10px" >
    
    ${this.generateOldYearOptions(1950, currentYear, res.startYear)}
  </select>
  <select class="swal2-input col-md-5" id="endyear">
    
    
    ${this.generateOldYearOptions(1950, currentYear, res.endYear)}
  </select>
    </div>                  
          `,
        confirmButtonText: 'Update',
        showCancelButton: 'Cancel',
        focusConfirm: false,
        preConfirm: () => {
          const academyname = Swal.getPopup().querySelector('#academyname').value;
          const degree = Swal.getPopup().querySelector('#degree').value;
          const major = Swal.getPopup().querySelector('#major').value;
          const startyear = Swal.getPopup().querySelector('#startyear').value;
          const endyear = Swal.getPopup().querySelector('#endyear').value;
         // console.log(academyname+'/'+degree+'/'+major+'/'+startyear+'/'+endyear)
          if (academyname === '' || degree === '' || major === '' || startyear <= 0 || endyear <= 0) {
            Swal.showValidationMessage('Make sure that all fields are filled!!');
            return false;
          }

          if(startyear > endyear){
            Swal.showValidationMessage('The start year can not be higher than end year !!');
            return false;
          }
          if(startyear === endyear){
            Swal.showValidationMessage('The start year can not be equal to end year !!');
            return false;
          }
          return {academyname, degree, major, startyear, endyear};

        }
      }).then(result => {
        if (result.isConfirmed) {

           applicantServices.updateEducation(id,
              {
                academyName: result.value.academyname,
                major: result.value.major,
                degree: result.value.degree,
                startYear: result.value.startyear,
                endYear: result.value.endyear
              }).then((response)=>{
             Swal.fire(
                 'Updated!',
                 'The education updated successfully.',
                 'success'
             )
             applicantServices.getEducations(this.state.id).then((res) => {
               //console.log(res)
               this.setState({educations: res});
             })
           })
        }
      })
    })
  }


//////Add
displayForm=(e)=>{
  Swal.fire({
    title: 'New Education',
    html:
        `
           <b><hr/></b>
    <textarea type="text"  id="academyname" class="swal2-input" placeholder="Academy Name"   
    style="width: 80%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"></textarea>
    <textarea id="degree" class="swal2-input" placeholder="Degree" rows="1"
    style="width: 80%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    ></textarea>
    <textarea id="major" class="swal2-input" placeholder="Major" rows="1"
    style="width: 80%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    ></textarea>
<br><br>
    <div class="swal2-input-group" style=" display: flex; margin-left: 3em" >
 <select class="swal2-input col-md-5" id="startyear" style="flex: 1;margin-right: 10px" >
    <option value="">Start year</option>
    ${this.generateYearOptions(1950, currentYear)}
  </select>
  <select class="swal2-input col-md-5" id="endyear">
    <option value="">End year</option>
    
    ${this.generateYearOptions(1950, currentYear)}
  </select>
    </div>                  
          `,
    confirmButtonText: 'Add',
    showCancelButton: 'Cancel',
    focusConfirm: false,
    preConfirm:()=>{
      const academyname = Swal.getPopup().querySelector('#academyname').value;
      const degree = Swal.getPopup().querySelector('#degree').value;
      const major = Swal.getPopup().querySelector('#major').value;
      const startyear = Swal.getPopup().querySelector('#startyear').value;
      const endyear = Swal.getPopup().querySelector('#endyear').value;

      if(academyname === '' || degree === '' || major === '' || startyear<=0 || endyear <= 0){
        Swal.showValidationMessage('Make sure that all fields are filled!!');
        return false;
       }

      if(startyear > endyear){
        Swal.showValidationMessage('The start year can not be higher than end year !!');
        return false;
      }
      if(startyear === endyear){
        Swal.showValidationMessage('The start year can not be equal to end year !!');
        return false;
      }

      return { academyname, degree, major, startyear, endyear };

     }
  }).then(result =>{
     if(result.isConfirmed){
       //console.log(result.value)
       const response = applicantServices.addEducation(this.state.id,
           {
                 academyName: result.value.academyname,
                 major: result.value.major,
                 degree: result.value.degree,
                 startYear: result.value.startyear,
                 endYear: result.value.endyear
                })
       if(response){
         Swal.fire(
             'Added!',
             'The education has been added to your list.',
             'success'
         )

       }


     }
    applicantServices.getEducations(this.state.id).then((res)=>{
      this.setState({ educations: res });
    })
  })
}
remove(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      applicantServices.removeEducation(id).then(res=>{
        this.setState({
          educations:  this.state.educations.filter(e=> e.id !==id),

        })

      })
      Swal.fire(
          'Deleted!',
          'The education has been deleted.',
          'success'
      )
    }
  })
}
  render() {
    if (this.state.redirect) {
      return this.props.history.push(this.state.redirect)
    }

    const filteredEducations = this.state.educations.filter((education) => {
      const { academyName, degree, major } = education;
      const { searchQuery } = this.state;
      const query = searchQuery.toLowerCase();

      return (
          academyName.toLowerCase().includes(query) ||
          degree.toLowerCase().includes(query) ||
          major.toLowerCase().includes(query)
      );
    });

    return (
        <>
          <Container fluid>
            <Row>
              <Col md="12">
                <h4>Educations</h4>
                <Button
                    className="btn-simple btn-link p-1"
                    type="button"

                    variant="success"
                    onClick={this.displayForm}

                    style={{float:'right',color:'white',textDecoration:'none'}}
                >
                  <i className="fas fa-plus"></i>Add education
                </Button>
              </Col>
            </Row>
            <br/>
            <Row>
              <p className="card-category">
                <input className="text-end" style={{padding: '5px',width:'25em',borderColor:'white',marginLeft:'15em'}}
                       type="text"
                       placeholder="Search . . . "
                       value={this.state.searchQuery}
                       onChange={this.handleSearchInputChange}
                />
              </p>
            </Row>

            <br/>


            {this.state.isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '7em' }}>Loading...</div>
            ) : (


          <Row xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
            {filteredEducations.map((education, index) => (
              <Col xs key={index}>
              <Card style={{boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderRadius:'5px 50px 30px'}}>
                <CardBody>
                  <CardTitle><h5><b>{education.degree}</b></h5></CardTitle>
                  <CardText><strong>Academy name :</strong> {education.academyName}
                   <br />
                    <strong>Major :</strong> {education.major}
                    </CardText>
                  <i>{education.startYear} - {education.endYear}</i>
                  <Button
                      className="btn-simple btn-link p-1"
                      type="button"
                      variant="info"
                      onClick={() => this.displayUpdateForm(education.id)}
                      title="Edit "
                      style={{float:'right',color:'white'}}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                      className="btn-simple btn-link p-1"
                      type="button"
                      variant="danger"
                      onClick={() => this.remove(education.id)}
                      title="Remove"
                      style={{float:'right',color:'white',marginRight:'4px'}}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </CardBody>
              </Card>
              </Col>
            ))}

          </Row>
          )}
          </Container>
        </>
    );
  }
}

export default Educations;
