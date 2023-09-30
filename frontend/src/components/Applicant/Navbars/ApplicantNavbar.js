
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';

import routes from "../../../routes_applicant.js";
import usersServices from "../../../services/users.services";
import {useHistory} from "react-router";
import Swal from "sweetalert2";

function Header() {
  const location = useLocation();
  const history = useHistory();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
  const userRoute = routes.find(route => route.path === '/user');

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        usersServices.logoutUser();
        history.push('/Login');
      }
    })
  }
  return (
    <Navbar bg="light" expand="lg" >
      <Container fluid >
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >

                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>

          </Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>

              <Nav.Link
                className="m-0"

              >
                <Link to={userRoute.layout + userRoute.path} style={{ textDecoration: 'none', color: '#888888'
                }}>
                <span className="no-icon" >Account</span>
                </Link>
              </Nav.Link>

            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                className="m-0"
              >

                <span onClick={handleLogout} className="no-icon">Log out</span>

              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
