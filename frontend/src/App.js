import styled from "styled-components";
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import ApplicantLayout from "./layouts/Applicant";
import RecruiterLayout from "./layouts/Recruiter";
import LoginAdmin from "./components/Admin/AdminLogin/loginAdmin";
import Header from "./components/Banner/Header";
import ProfComponent from "./components/Banner/ProfComponent";
import Clients from "./components/Features/Features";
import Footer from "./components/Contact/Footer";
import Services from "./components/Services/Services";
import AboutUs from "./components/About/AboutUs";
import Signup from "./components/Registration/Signup";
import Signin from "./components/Authentication/Signin";
import rocketImg from './assets/rocket.png';
import loginImg from './assets/login.png';
import {FiHome} from "react-icons/fi";

function App() {

    return(
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Container>
                        <Banner>
                            <Header />
                            <ProfComponent />
                        </Banner>
                        <AboutUs />
                        <LightColor>
                            <Services />
                        </LightColor>

                        <Clients />
                        <LightColor>
                            <Footer />
                        </LightColor>
                    </Container>
                </Route>



                <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                <Route path="/applicant" render={(props) => <ApplicantLayout {...props} />} />
                <Route path="/recruiter" render={(props) => <RecruiterLayout {...props} />} />



                <Route path="/authenticate">
                    <LoginAdmin />
                </Route>

                <Route path='/Login'>
                    <div style={{backgroundColor:'rgb(238, 238, 238)', height: '100vh', width: '100vw',marginTop:'-1.5%' }}>
                    <div className="container mt-3" >
                        <div className="row">
                            <div className="">
                                <Link to="/"  style={{ display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none'}}>
                                    <FiHome size={22} style={{marginTop:'10%'}}/>
                                    <span style={{marginLeft: '10px',marginTop:'10px'}}>Home</span>
                                </Link>
                            </div>
                        </div>
                            <div className="col-md-5">
                                <Signin />
                            </div>
                            <div className="col-md-7 my-auto">
                                <img className="img-fluid w-100" src={loginImg} alt="" style={{marginLeft:'30em',marginTop:'-50%'}}/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path='/Register'>
                 <div   style={{backgroundColor:'rgb(238, 238, 238)', height: '100vh', width: '100vw' ,marginTop:'-1.5%'}}>
                    <div className="container mt-3" >
                        <div className="row">
                            <div className="">
                                <Link to="/"  style={{ display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none'}}>
                                    <FiHome size={22} style={{marginTop:'10%'}}/>
                                    <span style={{marginLeft: '10px',marginTop:'10px'}}>Home</span>
                                </Link>
                            </div>
                            <div className="col-md-5">
                                <Signup />
                            </div>
                            <div className="col-md-7 my-auto">
                                <img className="img-fluid w-100" src={rocketImg} alt="" style={{marginLeft:'35em',marginTop:'-80%'}}/>
                            </div>
                        </div>
                    </div>
                 </div>
                </Route>

            </Switch>
        </Router>
    )
}


export default App

const Container = styled.div``;
const Banner = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  height: 100vh;
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 2rem;
  }
`;

const LightColor = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
`;
