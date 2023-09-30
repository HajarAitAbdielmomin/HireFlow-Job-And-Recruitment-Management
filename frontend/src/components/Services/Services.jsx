import React from 'react'
import styled from 'styled-components';
import {Slide} from 'react-awesome-reveal';
import Card from './Card';
import {FaRedoAlt} from "react-icons/fa";
import {FiCodesandbox} from "react-icons/fi";
import {FaSearchengin} from "react-icons/fa";

const Services = () => {
  return (
    <Container id='services'>
        <h2>
            Our <span className="green">services</span>
        </h2>
        <Cards>
            <Slide direction="left">

                <Card
                    Icon={FaRedoAlt}
                    title={"Application Tracking and Status Updates"}
                    disc={`CareerHub offers an intuitive application tracking system that allows job seekers to keep tabs on the status of their job applications. Once an applicant applies for a position through the app, they can easily monitor the progress of their application.`}
                />
            </Slide>
            <Slide direction="up">
                <Card
                    Icon={FiCodesandbox}
                    title={"Seamless Application Management"}
                    disc={` Applicants can easily apply to multiple job listings using their profiles, reducing the need to fill out repetitive application forms. Additionally, the system enables candidates to track the status of their applications and receive updates on their progress.
                    
                    `}
                />
            </Slide>
            <Slide direction="right">
                <Card
                    Icon={FaSearchengin}
                    title={"Efficient Job Search"}
                    disc={`Users can easily search for job openings using various filters, such as job title, location, industry, and experience level. The system's advanced algorithms ensure that job seekers receive relevant and up-to-date job listings, saving them time and effort in finding the right opportunities.`}
                />
            </Slide>
        </Cards>

    </Container>
  )
}

export default Services;

const Container = styled.div`
    width: 80%;
    max-width: 1280px;
  
  margin: 0 auto;
    padding: 3rem 0;
    text-align: center;
  position: relative;
    @media(max-width: 840px){
        width: 90%;
    }
    h2{
       
      margin-top: 3%;
    }

   
    
`;
const Cards = styled.div`
  display: grid;
 
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
