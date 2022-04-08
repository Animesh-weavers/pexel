import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap';

const ForgetPassword = () => {
  let emailRef = useRef();
  //entered Input
  let enteredEmail;
  //Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    //drop input values
    enteredEmail = emailRef.current.value;
    console.log(enteredEmail);
    //reset & after submit disable fields
    emailRef.current.value = "";
    emailRef.current.blur();
    document.getElementById('btn-form-submit').disabled = true;
    emailRef.current.disabled = true;
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
          <img src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?size=338&ext=jpg&ga=GA1.2.1921613389.1649405774" alt="sigin_image" width="80%" />
        </div>
        <div style={{ width: '30%' }}>
          <h1>Forget Password</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            </Form.Group>
            <Button id="btn-form-submit" type="submit" style={{ backgroundColor: '#29A080', border: 'none', width: '100%' }}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>

  )
}

export default ForgetPassword