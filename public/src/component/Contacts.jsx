import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from '../assets/icon-removebg-preview.png';

export default function Contact({ contacts, currentUser,changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
        console.log("chanhged")
        // Implement chat change logic here
    };

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>chatty</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div 
                                            className={`contact ${index === currentSelected ? "selected" : ""}`} 
                                            key={index} 
                                            onClick={() => changeCurrentChat(index, contact)}
                                        >
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ffffff39;
            border-radius: 1rem;
        }



        .contact {
            background-color: #ffffff39; /* Fixed missing semicolon */
            min-height: 5rem;
            width: 90%;
            display: flex; /* Added display flex for proper alignment */
            align-items: center; /* Center align items */
            gap: 1rem; /* Space between avatar and username */
            cursor:pointer;
            border-radius: 0.2rem;
            padding:0.4rem;
            transition: 0.5s ease-in-out;

            .avatar {
                img {
                    height: 3rem;
                }
            }
                .username{
                    h3{
                    color:white;
                    }    
                }
        }
         .selected{
            background-color: #9186f3;
         }       
    }
         .current-user{
            background-color: #odod30;
            display:flex;
            justify-content:center;
            align-items: center;
            gap: 2rem;
            .avatar{
                img{
                    height:4rem;
                    max-inline-size: 100%;
                }
            }
                .username{
                    h2{
                        color:white;
                    }
                }
        }
                 @media screen and (min-width:720px) and (max-width:1080px){
    gap:0.5rem;
    .username{
        h2{
        font-size:1rem}
    }


    }
         }
`;
