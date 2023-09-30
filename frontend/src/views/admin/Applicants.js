import React, {Component, useState} from "react";

// react-bootstrap components
import {

  Card,

  Container,
  Row,
  Col,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import {FaEdit, FaEye, FaTrash} from "react-icons/fa";
import usersServices from "../../services/users.services";
import adminServices from "../../services/adminServices";
import Swal from "sweetalert2";
import {request} from "../../services/axios_helper";

class Applicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      redirect:null,
      records: [], // Will be used for filtered data
      isLoading: true
    };

  }
  async componentDidMount() {
    const currentUser = usersServices.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/authenticate" });
    else{

      const recruitersData = await adminServices.getAllApplicants();
      this.setState({ data: recruitersData, records: recruitersData });
      setTimeout(() => {
        this.setState({ isLoading: false }); // Set isLoading to false after the delay
      }, 1000);

    }

  }
  handleFilter = (e) => {
    const newData = this.state.data.filter(row =>{
      return row.fullname.toLowerCase().includes(e.target.value.toLowerCase()) || row.email.toLowerCase().includes(e.target.value.toLowerCase());
    })

    this.setState({ records: newData }); // Update records with filtered data
  };
  getUser(id){
    adminServices.getUserById(id).then( (res) =>{

      Swal.fire({
        title: 'Update user',
        html: `
             <input type="text" id="fullname" class="swal2-input" value="${res.fullname}">
             <input type="email" id="email" class="swal2-input" value="${res.email}">
             <input type="password" id="password" class="swal2-input" placeholder="Type a new password">
             <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm your password">
             <br/>
             Change gender :
             <label>
               <input type="radio" name="gender" class="swal2-input" value="M" ${res.gender === 'M' ? 'checked' : ''}>
               Male
             </label>
            
            <label>
              <input type="radio" name="gender" class="swal2-input" value="F" ${res.gender === 'F' ? 'checked' : ''}>
              Female
            </label>
           `,
        confirmButtonText: 'Update',
        focusConfirm: false,
        preConfirm: () => {
          const fullname = Swal.getPopup().querySelector('#fullname').value;
          const email = Swal.getPopup().querySelector('#email').value;
          const password = Swal.getPopup().querySelector('#password').value;
          const confirmPassword = Swal.getPopup().querySelector('#confirmPassword').value;
          const selectedGender = Swal.getPopup().querySelector('input[name="gender"]:checked').value;
          const image = res.image


          if(email === '' || fullname === ''){
            Swal.showValidationMessage('Please fill in the fullname and email fields');
            return false;
          }
          if(password === '' && confirmPassword === ''){
            const password = res.password
            return { fullname, email ,password,gender: selectedGender, image };
          }
          if(password !== confirmPassword){
            Swal.showValidationMessage('Passwords do not match');
            return false;
          }

          return { fullname, email , password,gender: selectedGender, image };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the updated user data
          request('PUT','admin/users/'+id, {
            fullname: result.value.fullname,
            email: result.value.email,
            password: result.value.password,
            gender:result.value.gender,
            image:result.value.image}
          ).then((res)=>{
            Swal.fire(
                'Updated!',
                'The user has been updated.',
                'success'
            )
            adminServices.getAllApplicants().then((res)=>{
              this.setState({ data: res, records: res });
            })

          })
          //console.log('Updated user data:', result.value);
        }
      })
    });
  }
  removeUser(id){
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
        adminServices.removeUser(id).then(res=>{
          this.setState({
            data: this.state.data.filter(u=> u.id !==id),
            records: this.state.data.filter(u=> u.id !==id)
          })

        })
        Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
        )
      }
    })
  }
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  viewDetails(id){
    adminServices.getUserById(id).then( (res) =>{

      Swal.fire({
        title: 'User details',
        html:
            `
           <b> <hr/> </b>
           
            <p><b style="color: #533ce1">Fullname :</b> ${res.fullname}</p>
            <p><b style="color: #533ce1">Email :</b> ${res.email}</p>
            <p><b style="color: #533ce1">Gender :</b>  ${res.gender === 'F' ? 'Female' : 'Male'}</p>
            <p><b style="color: #533ce1">Address :</b> ${res.address}</p>
            <p><b style="color: #533ce1">Birthday :</b> ${this.formatDate(res.birthDate)}</p>
            <p><b style="color: #533ce1">Phone number :</b> 0${res.phone}</p>
            <p><b style="color: #533ce1">Status :</b> ${res.status !== null ? res.status : 'Unset'}</p>
                   
          `,

      })

    });
  }


  render(){
    if (this.state.redirect) {
      return this.props.history.push(this.state.redirect)
    }
    const columns = [
      {
        dataField: 'id',
        text: 'ID',
        sort: true,

      },
      {
        dataField: 'image',
        text: 'Image',
        formatter: (cellContent, row) => <img src={'/profiles/' + (row.image ? row.image : 'default.png')} alt={`Image of ${row.fullname}`}
                                              style={{ height: '50px',width: '50px' }}
        />,

      },
      {
        dataField: 'fullname',
        text: 'Fullname',
      },
      {
        dataField: 'email',
        text: 'Email',
      },
      {
        dataField: 'gender',
        text: 'Gender',
      },

      {
        dataField: 'status',
        text: 'Status',
      },
      {
        dataField: 'actions',
        text: 'Actions',
        formatter: (cell, row) => (
            <>
              <a href="#" onClick={() => this.getUser(row.id)}>
              <FaEdit
                  className="action-icon edit-icon"
                  // Replace with your edit handler
              />
              </a>
              <a href="#" onClick={() => this.removeUser(row.id)}>
              <FaTrash
                  className="action-icon delete-icon"
                  // Replace with your delete handler
              />
              </a>
              <a href="#" onClick={() => this.viewDetails(row.id)}>
              <FaEye
                  className="action-icon view-icon"
              />
              </a>
            </>
        ),

      },
    ];
    if (this.state.isLoading) {
      return <div style={{textAlign:'center',marginTop:'7em'}}>Loading...</div>;
    }
  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Applicants</Card.Title>
                <p className="card-category">
                  Here is a list of all applicants in the system
                  <input className="text-end" style={{padding:'5px', float:'right', borderRadius:'8px'}}
                         type="text" placeholder="Search user"  onChange={this.handleFilter} />

                </p>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">


                <BootstrapTable
                    wrapperClasses="table-responsive"
                    classes="table-hover table-striped"
                    keyField="id"
                    data={this.state.records}// Replace with your actual data array
                    columns={columns} // Replace with your actual columns array
                    pagination={paginationFactory()} // Add pagination factory
                    filter={filterFactory()}
                />

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
  }
}

export default Applicants;
