import React from "react";

import styled from "styled-components";
import {Slide} from "react-awesome-reveal";

const AboutUs = () => {
  return (
    <Container id="AboutUs">

          <Slide direction="left">
              <Texts>
                  <h3>About us - <span className="green">CareerHub</span></h3>
                  <h4>
                      Who are we ?
                  </h4>

                 <b> <span className="green">Our Story:</span> </b>
                  <p>
                      CareerHub was born out of a shared vision among our founding members - a vision of a world where finding the perfect job match is as easy as a few clicks. We recognized the challenges faced by job seekers in navigating the complex job market and the time-consuming hiring process that employers endure. With a passion for innovation and a drive to make a difference, we set out on a journey to build an app that would revolutionize the job management landscape.
                  </p>

                  <b> <span className="green">Our Commitment:</span> </b>
                  <p>
                      At CareerHub, we are committed to putting users at the heart of everything we do. Our user-centric approach drives our design, development, and decision-making processes. We listen to our users, understand their needs, and continuously evolve our platform to deliver an exceptional experience. Your success is our success, and we are dedicated to empowering you every step of the way.                  </p>
              </Texts>
          </Slide>
          <Slide direction="right">
              <Profile>
                  <img
                      src="/pictures/aboutus.png"
                      alt="about"
                  />
              </Profile>
          </Slide>
    </Container>
  );
};

export default AboutUs;

const Container = styled.div`
  display: flex;
  width: 80%;
 
  max-width: 1280px;
  padding: 4rem 0;
  margin-left: 10%;
  z-index: 1;
  @media (max-width: 840px) {
    width: 90%;
  }
  
`;

const Texts = styled.div`
  flex: 1;
  margin-top: 3%;
  h4 {
    padding: 1rem 0;
    font-weight: 500;
  }
  h1 {
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    letter-spacing: 2px;
  }
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  p {
    font-weight: 300;
  }
  `;

const Profile = styled.div`
  img {
    margin-top: 25%;
    height: 22rem;
    width: 27rem;
    filter: drop-shadow(0px 10px 10px #01be9570);
    transition: transform 400ms ease-in-out;
    @media (max-width: 790px) {
      width: 20rem;
    }

    @media (max-width: 660px) {
      width: 18rem;
    }

    @media (max-width: 640px) {
      width: 100%;
    }
  }

  :hover img {
    transform: translateY(-10px);
  }
`;