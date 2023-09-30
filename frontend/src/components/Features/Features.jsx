import React, { useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import ClientSlider from './ClientSlider';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from 'react-awesome-reveal';

let clients = [
    {
        name : "Resume Builder ",
        img_url : "/pictures/resume.png",
        disc : `The system includes a user-friendly resume builder that enables job seekers to create and manage their professional profiles. Users can input their work experience, skills, education, and other relevant details.`
    },
    {
        name : "Applicant Tracking System ",
        img_url : "/pictures/track.png",
        disc : `Employers benefit from the Applicant Tracking System (ATS) that simplifies candidate management. The ATS allows employers to track and review job applications, shortlist candidates, and communicate directly with applicants.`
    },
    {
        name : "Interview Scheduling",
        img_url : "/pictures/timing.png",
        disc : `CareerHub facilitates interview scheduling between employers and candidates through an integrated calendar system. Users can easily schedule interviews, and the system sends timely reminders to ensure a smooth interview process.`
    },
    {
        name : "Messaging and Communication",
        img_url : "/pictures/communication.png",
        disc : `CareerHub provides an in-app messaging system that facilitates seamless communication between employers and job seekers. Users can exchange messages, discuss job opportunities, and ask questions directly within the app.`
    },
]
let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows : false,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]}

const Clients = () => {
    const arrowRef = useRef(null);
    let clientDisc;
    clientDisc = clients.map((item, i) => (
        <ClientSlider item={item} key={i}/>

    ))

  return (
    <Container id='features'>
        <Slide style={{marginTop:'7px',fontSize:'1.5em'}} direction="left">
            <span className="green">Features</span>

        </Slide>
        <Testimonials>
            <Slider ref={arrowRef} {...settings} >
                {clientDisc}
            </Slider>
            <Buttons>
                <button
                onClick={() => arrowRef.current.slickPrev()}
                ><IoIosArrowBack/></button>
                <button
                onClick={() => arrowRef.current.slickNext()}
                ><IoIosArrowForward/></button>
            </Buttons>
        </Testimonials>
    </Container>
  )
}

export default Clients

const Container = styled.div`
    width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 0;
    color: white;
    @media(max-width:840px){
        width: 90%;
    }

    span{
        font-weight: 700;
        text-transform: uppercase;
    }

    h1{
        padding-top: 1rem;
        text-transform: capitalize;
    }

    .slick-list, .slick-slider, .slick-track{
        padding: 0;
     
    }

    .slick-dots{
        text-align: left;
        margin-left: 1rem;
  
    }

    .slick-dots li button:before{
        content: "";
    }

    .slick-dots li button{
        width: 9px;
        height: 4px;
        background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
        padding: 0.1rem;
        margin-top: 1rem;
        transition: all 400ms ease-in-out;
        border-radius: 50px;
    }
    
    .slick-dots li.slick-active button{
        background: #01be96;
        width: 15px;
    }

    .slick-dots li{
        margin: 0;
    }
`

const Testimonials = styled.div`
    margin-top: 2rem;
    position: relative;
`
const Buttons = styled.div`
    position: absolute;
    right: 0.7rem;
    bottom: -2rem;

    button{
        background-color: transparent;
        margin-left: 0.5rem;
        border: none;
        color: #01be96;
        cursor: pointer;
        font-size: 1.1rem;
    }

    @media(max-width:530px){
        display: none;
    }
`