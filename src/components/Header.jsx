import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { selectUsername, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/user/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useEffect } from 'react';



function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUsername);
  const userPhoto = useSelector(selectUserPhoto);

useEffect(()=>{
  auth.onAuthStateChanged(async(user)=>{
    if(user){
      setUser(user);
      navigate("/home")
    }
  });
}, [username]);



  const  handleAuth = () => {

    if(!username){
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  } else if(username){
    auth.signOut().then(()=>{
      dispatch(setSignOutState())
      navigate('/')
    }).catch((err)=> alert(err.message))
  }}
  const setUser = (user)=>{
    dispatch(setUserLoginDetails({
      name:user.displayName,
      email:user.email,
      photo: user.photoURL,
    }))
  }
  return (
   <NAV>
    <Logo>
      <img src='/images/logo.svg' alt='disney='/>
    </Logo>
    {
      !username ? ( <Login onClick={handleAuth}>Login</Login>): 
      <>
    <NavMenu>
      <a href='/home'>
      <img src='/images/home-icon.svg' alt='HOME'/>
      <span>HOME</span>
      </a>
      <a>
      <img src="/images/search-icon.svg" alt="SEARCH" />
      <span>SEARCH</span>
      </a>
      <a>
        <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
        <span>WATCHLIST</span>
      </a>
      <a>
        <img src="/images/original-icon.svg" alt="ORIGINALS" />
        <span>ORIGINALS</span>
      </a>
      <a>
        <img src="/images/movie-icon.svg" alt="MOVIES" />
        <span>MOVIES</span>
      </a>
      <a>
        <img src="/images/series-icon.svg" alt="SERIES" />
        <span>SERIES</span>
      </a>

    </NavMenu>
    <SignOut>
    <UserImg src={userPhoto} alt={username}/>
    <DropDown>
      <span onClick={handleAuth}>Sign Out</span>
    </DropDown>
    </SignOut>
    
    </>
    }
    
  </NAV>
  )
}

const NAV = styled.nav`
justify-content: space-between;
position: fixed;
top:0;
left:0;
right: 0;
height:70px;
background-color: #090b13;
display:flex;

align-items: center;
padding:0 36px;
letter-spacing:16px;
z-index:3;
`;
const Logo=styled.a`
padding:0;
width:80px;
margin-top: 4px;
font-size: 0;
 display:inline-block;

 img{
 display:block;
 width:100%;

 }
`
const NavMenu= styled.div`
align-items: center;
display:flex;
flex-flow: row nowrap;
height:100%;
justify-contents:flex-end;
margin:0px;
padding:0px;
position:relative;
margin-right: auto;
margin-left: 25px;

a{
display:flex;
padding: 0 12px;
align-items: center;

img{
height:20px;
min-height:20px;
width:20px
z-index:auto;}

span{
color: rgb(249,249,249);
font-size:13px;
letter-spacing:1.42px;
line-height: 1.09;
padding: 2px 0px;
white-space: nowrap;
position: relative;

&:before{
left:0px;
content:"";
height: 2px;
opacity: 0;
position: absolute;
right:0px;
transform-origin: left cener;
transform: scaleX(0);
transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
background-color: rgb(249, 249, 249);
border-radius: 0px 0px 4px 4px;
bottom: -6px;
visibility: hidden;
width:auto;
}
}

&:hover{
  span: before{
  transform:scaleX(1);
  visibility:visible;
  opacity: 1 !important
  }
}
}
// @media (max-width: 768px){
// display:none;}
`;

const Login= styled.a`
background-color: rgba(0,0,0,0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing:1.5px;
border: 1px solid #f9f9f9;
 border-radius: 4px;
 transition: all 0.2s ease 0s;

 &:hover{
 background-color: #f9f9f9;
 color:#000;
 border-color: transparent;
 }

`
const UserImg = styled.img`
height: 50%;

`;

const DropDown= styled.div`
position:absolute;
top:40px;
right:0px;
background: rgb(19, 19, 19);
border: 1px solid rgba(151,151,151, 0.34)
border-radius: 4px;
box-shadow: rgb(0 0 0 /50) 0px 0px 18px 0px;
padding: 10px;
font-size : 14px;
letter-spacing: 3px;
width:100px;
opacity: 0;
`
const SignOut= styled.div`
position: relative;
display: flex;
height: 48px;
width:48px;
cursor: pointer;
align-items: center;
justify-content:center;

${UserImg}{
  border-radius:50%;
  width:100%;
  height:100%;

}
  &:hover{
  ${DropDown}{
  opacity:1;
  transition-duration: 1s;
  }
`
export default Header