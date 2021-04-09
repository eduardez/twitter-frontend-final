import React, { useState } from 'react';
import { Navbar, NavbarBrand, Button, Nav, NavItem, Media, Row, Col, Container,Toast, ToastBody, ToastHeader  } from 'reactstrap';
import './css/App.css'

import PostList from './posts/PostList';

import { GoogleLogin } from 'react-google-login';
import config from '../config.js';

import tuiter_icon from '../images/icon.ico';
var imgStyle = {
  maxWidth: "85px",
};

export default function App(props){

  const [loginMessage, setLoginMessage] = useState(null);
  const [toastColor, setToastColor] = useState(null);
  const [show, setShow] = useState(false);
  
  const responseGoogleSuccess = (googleUser) => {
    var profile = googleUser.getBasicProfile();

    sessionStorage.setItem('name', profile.getName());
    sessionStorage.setItem('email', profile.getEmail());
    sessionStorage.setItem('image', profile.getImageUrl());
    props.history.push("/home");

    setShow(true)
    setToastColor("success")
    setLoginMessage("Autenticado correctamente.")
    timeoutToast()


  }

  const responseGoogleFailure = (response) => {
      setShow(true)
      setToastColor("danger")
      setLoginMessage("Error en la autenticacion.")
      timeoutToast()
  }

  const timeoutToast = () =>{
    window.setTimeout(()=>{
      setShow(false)
    },3000)
  }


  const closeToast = () =>{
    setShow(false)
  }
  return(
    <Container>
        <Toast className='react_toast' isOpen={show}>
          <ToastHeader icon={toastColor}>
            El Tuiter
          </ToastHeader>
          <ToastBody>
            <p>
              {loginMessage}
            </p>
            <Button outline onClick={closeToast} size="sm">
              Ok
            </Button>
          </ToastBody>
        </Toast>
      <Row>
        <Col>
          <Navbar color="primary" light expand="md">
          <Media style={imgStyle} object src={tuiter_icon} alt="Bird"/>
          <NavbarBrand>
            <span className="app_title"> El Tuiter </span>
          </NavbarBrand>
          <Nav navbar>
            <NavItem>
              <GoogleLogin
                clientId={config.clientID}
                buttonText="Login with Google"
                theme='dark'
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
              />
            </NavItem>
          </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col xs= "12">
          <PostList/>
        </Col>
      </Row>
    </Container>
  );
}