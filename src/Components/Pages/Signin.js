import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap';

const Signin = () => {
  let emailRef = useRef();
  let passwordRef = useRef();

  //entered Input
  let enteredEmail;
  let enteredPassword;

  //Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    //drop input values
    enteredEmail = emailRef.current.value;
    enteredPassword = passwordRef.current.value;


    console.log(enteredEmail, " - ", enteredPassword);


    //reset input field
    emailRef.current.value = "";
    passwordRef.current.value = "";
    emailRef.current.blur();
    passwordRef.current.blur();
    document.getElementById('btn-form-submit').disabled = true;
  }

  return (

    <div style={{
      width: "100%",
      height: "90vh",
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div className="container" style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div className="image">
          <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?size=626&ext=jpg&ga=GA1.2.1921613389.1649405774" alt="sigin_image" width="80%" />
        </div>
        <div style={{ width: '40%' }}>
          <h1>Signin</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
            </Form.Group>
            <Button id="btn-form-submit" type="submit" style={{ backgroundColor: '#29A080', border: 'none' }}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>

  )
}

export default Signin