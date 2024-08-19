import React,{useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../util/APIRoutes';
import Contact from '../component/Contacts';
import Welcome from '../component/welcome';
import ChatContainer from '../component/ChatContainer'; 
import { io} from "socket.io-client"


function Chat(){
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser]= useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded ] = useState(false);
/////////////////////////
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login"); }
    },[])

    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user", currentUser._id)
        }
    },[currentUser])

    const getUser = async ()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login"); }
        else{
            setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
            setIsLoaded(true);
        };
        console.log("done 1")
    }

    useEffect(()=>{
        getUser();
    },[])
    const loadContacts= async ()=>{
        if(currentUser){
            console.log(currentUser.isAvatarImageSet)
            if(currentUser.isAvatarImageSet){
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                setContacts(data.data);
            }else{
                navigate("/setAvatar")
            }
        }
        console.log("done 2")

    }

    useEffect(()=>{
        loadContacts();
    },[currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        
        <>
        <Container>
            <div className="container">
                <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {
                    isLoaded ? (currentChat === undefined ? <Welcome currentUser={currentUser} />:
                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>) : ""
                }
                
            </div>
        </Container>
        </>
    )
}
const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap: 1rem;
align-items: center;
background-color:#131324;
.container{
    height: 85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns:35% 65%;
    }
}
`;

export default Chat