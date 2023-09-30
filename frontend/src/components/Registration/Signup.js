import React from 'react';
import {Formik, Form} from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import Select from 'react-select';
import {req} from "../../services/axios_helper";
import {toast, ToastContainer} from "react-toastify";
import {useHistory} from "react-router";
import redirect from "react-router-dom/es/Redirect";

 const Signup = () => {

     const validate = Yup.object({
        fullname: Yup.string()
            .min(5, 'Must be 30 characters or less')
            .max(30, 'Must be 30 characters or less')
            .required('Required'),

        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })
    const userOptions = [
        { value: 'recruiter', label: 'Recruiter' },
        { value: 'applicant', label: 'Applicant' },

    ];
    return (

        <Formik
            initialValues={{
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
                gender: 'F',
                usertype:''
            }}

            validationSchema={validate}
            onSubmit={async (values,action) => {
                try {
                    //console.log(values);

                    const response =  await req("POST", "/signup",
                        {fullname: values.fullname, email: values.email,
                            role: values.usertype,password: values.password,gender:values.gender});

                    if (response) {

                       //console.log(response.data)
                        toast.success("Registered successfully!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                      action.resetForm()

                    }

                } catch (error) {
                    toast.error(''+error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                   action.resetForm()
                }
            }}
        >
            {formik => (
                <div>
                    <ToastContainer/>
                    <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                    <Form onSubmit={formik.handleSubmit}>
                        <TextField label="Fullname" name="fullname"  type="text" style={{backgroundColor:'white',borderRadius:'10px'}}/>
                        <TextField label="Email" name="email" type="email" style={{backgroundColor:'white',borderRadius:'10px'}}/>
                        <TextField label="password" name="password" type="password" style={{backgroundColor:'white',borderRadius:'10px'}}/>
                        <TextField label="Confirm Password" name="confirmPassword" type="password" style={{backgroundColor:'white',borderRadius:'10px'}}/>
                        <div className="select-input">
                            <label>What kind of user are you</label>
                            <Select
                                name="usertype"
                                options={userOptions}
                                placeholder="Select type..."
                                onChange={option => formik.setFieldValue('usertype', option.value)}
                                value={userOptions.find(option => option.value === formik.values.usertype)}
                            />
                        </div>
                        <div className="radio-buttons" style={{display: 'flex', gap: '10px',marginTop: '10px'}}>
                            <label style={{display: 'flex',
                                alignItems: 'center',
                                marginRight: '15px'}}>
                                <input type="radio" name="gender" value="F"
                                       checked={formik.values.gender === "F"}
                                       onChange={formik.handleChange}
                                />
                                &nbsp;Female
                            </label>
                            <label style={{display: 'flex',
                                alignItems: 'center',
                                marginRight: '15px'}}>
                                <input type="radio" name="gender" value="M"
                                       checked={formik.values.gender === "M"}
                                       onChange={formik.handleChange}
                                />
                                &nbsp;Male
                            </label>
                        </div>

                        <button className="btn btn-dark mt-3" type="submit"  onClick={formik.handleSubmit} style={{backgroundColor:'#01be96',borderColor:'white'}}>Register</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset" style={{marginLeft:'10px'}}>Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
}
export default Signup