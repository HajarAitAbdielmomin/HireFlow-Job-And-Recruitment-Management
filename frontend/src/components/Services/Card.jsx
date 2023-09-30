import React from 'react'
import styled from 'styled-components';

const Card = (props) => {
    const { Icon, disc, title } = props;
  return (
    <Container>
        <span className='green'><Icon/></span>
        <h1>{title}</h1>
        <p>{disc}</p>
    </Container>
  )
}

export default Card;

const Container = styled.div`
    width: 100%;
  background-color: #191923;
  color:white;
    padding: 1rem;
    text-align: center;
    span{
        font-size: 4rem;
    }
    
    h1{
        font-size: 1.2rem;
        padding-bottom: 1rem;
    }

    p{
        font-size: 0.8rem;
    }
`