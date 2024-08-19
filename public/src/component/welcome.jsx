import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"
export default function welcome({currentUser}){
    return(
        <Container>
            <img src={Robot} alt="robot"/>
            <h1>Welcome <span>{currentUser.username} !</span></h1>
            <h3>Please select a chat to Start Messaging</h3>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    color:white;
    gap:1rem;
    img{
        height:7rem;
    }   
    span{
        color:#4e00ff;
    } 
`