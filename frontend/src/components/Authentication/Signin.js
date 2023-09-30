import React from 'react';
import {Formik, Form} from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import {request, setAuthHeader} from "../../services/axios_helper";
import {toast, ToastContainer} from "react-toastify";
import redirect from "react-router-dom/es/Redirect";
import usersServices from "../../services/users.services";
import {useHistory} from "react-router";

 const Signin = () => {
     const history = useHistory();

     const validate = Yup.object({

    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    })

  return (

      <Formik
      initialValues={{
        email: '',
        password: '',

      }}

      validationSchema={validate}
      onSubmit={async (values,action) => {
        //console.log(values)

          try {
              const response = await request("POST", "/signin", {email:values.email,password: values.password});

              if (response) {
                  if(response.data.roles.includes('ROLE_ADMIN')){
                      action.resetForm();
                      toast.error('Authentication not authorized !', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                      });
                      return <redirect to='/Login' />;
                  }
                  if(response.data.roles.includes('ROLE_APPLICANT')){
                      setAuthHeader(response.data.accessToken);
                      localStorage.setItem("user", JSON.stringify(response.data));
                      console.log(usersServices.getCurrentUserA_R());
                      return history.push('/applicant/jobs');
                  }
                  if(response.data.roles.includes('ROLE_RECRUITER')){
                      setAuthHeader(response.data.accessToken);
                      localStorage.setItem("user", JSON.stringify(response.data));
                      console.log(usersServices.getCurrentUserA_R());
                      return history.push('/recruiter/jobForm');
                  }


              } else {
                  setAuthHeader(null);
                  //console.log('Login failed');
                  toast.warn('Authentication failed !', {
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

              action.resetForm();
          } catch (error) {
              toast.error('Bad credentials !', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
              console.error('An error occurred:', error);
          }

          action.resetForm()
      }}
    >
      {formik => (
        <div>
            <ToastContainer/>
          <h1 className="my-4 font-weight-bold .display-4">Sign In</h1>
          <Form onSubmit={formik.handleSubmit}>
              <TextField label="Email" name="email" type="email" style={{backgroundColor:'white',borderRadius:'10px'}}/>
              <TextField label="password" name="password" type="password" style={{backgroundColor:'white',borderRadius:'10px'}}/>

              <button className="btn btn-dark mt-3" type="submit" style={{backgroundColor:'#01be96',borderColor:'white'}} onClick={formik.handleSubmit}>Login</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset" style={{marginLeft:'10px'}}>Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}
export default Signin