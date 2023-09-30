import React, {Component, useState} from "react";

// react-bootstrap components
import {

  Card,

  Container,
  Row,
  Col, Button,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import usersServices from "../../services/users.services";
import adminServices from "../../services/adminServices";
import Swal from "sweetalert2";
import {request} from "../../services/axios_helper";
import {CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import applicantServices from "../../services/applicantServices";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:null,
      id:'',
      projects:[],
      searchQuery: '',
      isLoading: true
    };

  }
  async componentDidMount() {
    const currentUser = usersServices.getCurrentUserA_R();

    if (!currentUser) this.setState({ redirect: "/Login" });
    else{

      this.setState({
        id : currentUser ? currentUser.id : 0,
        projects: await applicantServices.getProjects(currentUser ? currentUser.id : 0)
      })
      setTimeout(() => {
        this.setState({ isLoading: false }); // Set isLoading to false after the delay
      }, 1000);

    }

  }

  //update
  displayUpdateForm=(id) =>{
    applicantServices.getProject(id).then( (res) => {

      Swal.fire({
        title: 'Update Project',
        html:
            `
           <b><hr/></b>
    <textarea type="text" id="title" class="swal2-input" placeholder="Project title"   
    style="width: 100%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;">${res.projectTitle}</textarea>
    <textarea id="details" class="swal2-input" placeholder="Details about the project" 
    style="width: 100%;
  height: 85px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${res.details}</textarea>
    <textarea id="techno" class="swal2-input" placeholder="Technologies used" rows="1"
    style="width: 100%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    >${res.technologies}</textarea>         
          `,
        confirmButtonText: 'Update',
        showCancelButton: 'Cancel',
        focusConfirm: false,
        preConfirm:()=>{
          const title = Swal.getPopup().querySelector('#title').value;
          const details = Swal.getPopup().querySelector('#details').value;
          const techno = Swal.getPopup().querySelector('#techno').value;
          if (title === '' || details === '' || techno === '' ) {
            Swal.showValidationMessage('Make sure that all fields are filled!!');
            return false;
          }

          return { title, details, techno }

        }

      }).then(result =>{
        if (result.isConfirmed) {
          //console.log(result.value)
          applicantServices.updateProject(id,
              {
                projectTitle: result.value.title,
                details: result.value.details,
                technologies: result.value.techno,

              }).then((response) =>{
            Swal.fire(
                'Updated!',
                'The Project has been updated.',
                'success'
            )
            applicantServices.getProjects(this.state.id).then((res) => {
              //console.log(res)
              this.setState({projects: res});
            })
          })

        }

      })

    })
    }

  //add
  displayForm=(e)=>{
    Swal.fire({
      title: 'New Project',
      html:
          `
           <b><hr/></b>
    <textarea type="text" id="title" class="swal2-input" placeholder="Project title"   
    style="width: 100%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"></textarea>
    <textarea id="details" class="swal2-input" placeholder="Details about the project" 
    style="width: 100%;
  height: 85px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    ></textarea>
    <textarea id="techno" class="swal2-input" placeholder="Technologies used" rows="1"
    style="width: 100%;
  height: 70px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  overflow-y: auto;
  resize: none;"
    ></textarea>         
          `,
      confirmButtonText: 'Add',
      showCancelButton: 'Cancel',
      focusConfirm: false,
      preConfirm:()=>{
        const title = Swal.getPopup().querySelector('#title').value;
        const details = Swal.getPopup().querySelector('#details').value;
        const techno = Swal.getPopup().querySelector('#techno').value;
        if (title === '' || details === '' || techno === '' ) {
          Swal.showValidationMessage('Make sure that all fields are filled!!');
          return false;
        }

        return { title, details, techno }

      }

    }).then(result =>{
      if (result.isConfirmed) {
        //console.log(result.value)
        const response = applicantServices.addProject(this.state.id,
            {
              projectTitle: result.value.title,
              details: result.value.details,
              technologies: result.value.techno,

            })
        if(response){
         Swal.fire(
             'Added!',
             'The Project has been added to your list.',
             'success'
         )
       }

      }
      applicantServices.getProjects(this.state.id).then((res)=>{
        this.setState({ projects: res });
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
        applicantServices.removeProject(id).then(res=>{
          this.setState({
            projects:  this.state.projects.filter(e=> e.id !==id),

          })

        })
        Swal.fire(
            'Deleted!',
            'The project has been deleted.',
            'success'
        )
      }
    })
  }
  handleSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  render(){
    if (this.state.redirect) {
      return this.props.history.push(this.state.redirect)
    }
    const filteredProjects = this.state.projects.filter((project) => {
      const { projectTitle, technologies, details } = project;
      const { searchQuery } = this.state;
      const query = searchQuery.toLowerCase();

      return (
          projectTitle.toLowerCase().includes(query) ||
          technologies.toLowerCase().includes(query) ||
          details.toLowerCase().includes(query)
      );
    });

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <h4>Projects</h4>
            <Button
                className="btn-simple btn-link p-1"
                type="button"

                variant="success"
                onClick={this.displayForm}

                style={{float:'right',color:'white',textDecoration:'none'}}
            >
              <i className="fas fa-plus"></i>Add project
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
     <div>
        {filteredProjects.map((project, index) => (
       <Row key={index}>
         <Col>
           <Card style={{boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)',borderRadius:'15px'}}>
             <CardHeader><h4>{project.projectTitle}</h4></CardHeader>
             <CardBody>
               <CardTitle><b>Details about the project :</b></CardTitle>
               <CardText>{project.details}
                 <br/><b>Technologies :</b> {project.technologies}
               </CardText>
               <Button
                   className="btn-simple btn-link p-1"
                   type="button"
                   variant="info"
                   onClick={() => this.displayUpdateForm(project.id)}
                   title="Edit "

                   style={{float:'right',color:'white'}}
               >
                 <i className="fas fa-edit"></i>
               </Button>
               <Button
                   className="btn-simple btn-link p-1"
                   type="button"
                   variant="danger"
                   onClick={() => this.remove(project.id)}
                   title="Remove project"
                   style={{float:'right',color:'white',marginRight:'4px'}}
               >
                 <i className="fas fa-times"></i>
               </Button>
             </CardBody>
           </Card>
         </Col>
       </Row>
            ))}
            </div>
            )}
      </Container>
    </>
  );
  }
}

export default Projects;
