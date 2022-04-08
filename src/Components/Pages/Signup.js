import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  let emailRef = useRef();
  let passwordRef = useRef();
  let nameRef = useRef();
  let showPassRef = useRef();

  //entered Input
  let enteredEmail;
  let enteredPassword;
  let enteredName;
  let enteredShowPass;



  //Password Show Handler
  const passwordShowHandler = () => {
    setPasswordShown(!passwordShown);
  }

  //Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    //drop input values
    enteredEmail = emailRef.current.value;
    enteredPassword = passwordRef.current.value;
    enteredName = nameRef.current.value;

    console.log(enteredEmail, " - ", enteredPassword, " - ", enteredName);

    //reset input field
    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.blur();
    passwordRef.current.blur();
    nameRef.current.blur();
    document.getElementById('btn-form-submit').disabled = true;
    emailRef.current.disabled = true;
    passwordRef.current.disabled = true;
    nameRef.current.disabled = true;
    showPassRef.current.blur();
    showPassRef.current.disabled = true;
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
        <div style={{ width: '43%' }}>
          <h1>Signup</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                ref={nameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Label>Password</Form.Label>
              <Form.Control type={passwordShown ? 'text' : 'password'} placeholder="Password" ref={passwordRef} required />
              <Form.Check aria-label="option 1" label="Show Password" id="show-pass" style={{ userSelect: 'none' }} ref={showPassRef} onClick={passwordShowHandler} />
            </Form.Group>
            <Button id="btn-form-submit" type="submit" style={{ backgroundColor: '#29A080', border: 'none', width: '100%' }}>
              Signup
            </Button>
          </Form>
        </div>
        <div className="image" style={{ textAlign: 'center' }}>
          <img src="https://img.freepik.com/free-vector/instruction-correct-pose-during-office-work-flat-illustration-cartoon-worker-sitting-desk-with-right-posture-healthy-back-looking-computer_74855-14087.jpg?size=626&ext=jpg&ga=GA1.2.1921613389.1649405774" alt="sigin_image" width="88%" />
        </div>

      </div>
    </div>

  )
}

export default Signup