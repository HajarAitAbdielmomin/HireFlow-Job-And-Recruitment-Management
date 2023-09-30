import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Slide } from "react-awesome-reveal";
const ProfComponent = () => {
  return (
    <Container id="home">
      <Slide direction="left">
        <Texts>
          <h3>
            Welcome to <span className="green">CareerHub</span> - Your Gateway to a World of Opportunities!
          </h3>

          <p>
            At CareerHub, we believe that finding the right job or the perfect candidate shouldn't be a daunting task. That's why we've created a seamless and efficient job management platform that connects talented job seekers like you with forward-thinking employers.
<br/><br/>

              Don't miss out on your next big opportunity. Sign up now and let CareerHub empower your career aspirations!
          </p>
            <Link to="/Login" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#01be96', color: '#fff' }}>Sign in</button>
            </Link>
            <Link to="/Register" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: 'white', color: '#01be96' }}>Sign up</button>
            </Link>
        </Texts>
      </Slide>
      <Slide direction="right">
        <Profile>
          <img
            src="/pictures/homePhoto.png"
            alt="profile"

          />
        </Profile>
      </Slide>
    </Container>
  );
};

export default ProfComponent;

const Container = styled.div`
  display: flex;
  gap: 2rem;
 color: white;
  
  padding-top: 3rem;
  width: 80%;
  max-width: 1280px;
  margin-left: 10%;
  z-index: 1;
  @media (max-width: 840px) {
    width: 90%;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
const Texts = styled.div`
  flex: 1;
  margin-top: 15%;
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
    padding-bottom: 1.2rem;
    text-transform: capitalize;
  }
  p {
    font-weight: 300;
  }

  button {
    padding: 0.7rem 2rem;
 
    margin-top: 3rem;
    margin-right: 1rem;
    
    cursor: pointer;
    
    border: none;
    
    font-weight: 500;
    filter: drop-shadow(0px 10px 10px #01be9551);
    :hover {
      filter: drop-shadow(0px 10px 10px #01be9570);
    }
  }
`;




const Profile = styled.div`
  img {
    margin-top: 15%;
    width: 25rem;
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
