import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';

const ChangePassword = () => {

    const [passwordShown, setPasswordShown] = useState(false);
    let passwordRef = useRef();
    let showPassRef = useRef();
    //entered Input
    let enteredPassword;
    let enteredShowPass;



    //Password Show Handler
    const passwordShowHandler = () => {
        setPasswordShown(!passwordShown);
    }
    //Form Submit Handler
    const formSubmitHandler = (event) => {
        event.preventDefault();
        //drop input values
        enteredPassword = passwordRef.current.value;
        console.log(enteredPassword);
        //reset & after submit disable fields
        passwordRef.current.value = "";
        passwordRef.current.blur();
        document.getElementById('btn-form-submit').disabled = true;
        passwordRef.current.disabled = true;
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
                <div className="image">
                    <img src="https://img.freepik.com/free-vector/female-cartoon-designer-drawing-canvas-with-huge-pen_74855-19778.jpg?size=626&ext=jpg&ga=GA1.1.1921613389.1649405774" alt="sigin_image" width="100%" />
                </div>
                <div style={{ width: '40%' }}>
                    <h1>Change Password</h1>
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={passwordShown ? 'text' : 'password'} placeholder="Password" ref={passwordRef} required />
                            <Form.Check aria-label="option 1" label="Show Password" id="show-pass" style={{ userSelect: 'none' }} ref={showPassRef} onClick={passwordShowHandler} />
                        </Form.Group>
                        <Button id="btn-form-submit" type="submit" style={{ backgroundColor: '#29A080', border: 'none', width: '100%' }}>
                            Change
                        </Button>

                    </Form>
                </div>
            </div>
        </div>

    )
}

export default ChangePassword