import React from "react";
import { useFormik } from "formik";
import "./login.css";
import { Button } from "react-bootstrap";
import { loginSchema } from "./LoginSchema";
import { request, setAuthHeader } from 'services/axios_helper';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from "react-router";
import redirect from "react-router-dom/es/Redirect";
import usersServices from "../../../services/users.services";


const initialValues = {

  email: "",
  password: "",

};

const LoginAdmin = () => {
  const history = useHistory();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async ( values,action) => {
      try {
         const response = await request("POST", "/signin", {email:values.email,password: values.password});

          if (response) {
            if(!response.data.roles.includes('ROLE_ADMIN')){
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
              return <redirect to='/authenticate' />;
            }
            setAuthHeader(response.data.accessToken);
            localStorage.setItem("admin", JSON.stringify(response.data));
            console.log(usersServices.getCurrentUser());

             return history.push('/admin/dashboard');
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
    },
  });

  return (
    <div>
      <section
        className="p-5 w-100"
        style={{ backgroundColor: "#eee", borderRadius: ".5rem .5rem 0 0" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mt-4">Sign in</p>

                    <form onSubmit={handleSubmit}>

                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="form-control"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="email"
                          />
                          {errors.email && touched.email ? (
                            <small className="text-danger mt-1">
                              {errors.email}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col text-left">
                          <label htmlFor="first" className="form-label">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.password && touched.password ? (
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col text-right actionButtons">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={resetForm}
                          >
                            Clear
                          </Button>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSubmit}
                          >
                            Login
                          </Button>
                        </div>
                      </div>
                   <br />
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <ToastContainer />
                    <img
                      src="/pictures/admin.png"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginAdmin;
