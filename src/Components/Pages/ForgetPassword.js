import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import useForm from "../../validation/UseForm";
import validate from "../../validation/FormValidationRules";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    forgetPassword,
    validate
  );
  const navigate = useNavigate();
  let emailRef = useRef();

  function forgetPassword() {
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let bodyContent = {
      requestType: "PASSWORD_RESET",
      email: values.email,
    };

    let reqOptions = {
      url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDNlkjPgbkBTKxeDo-wxYbIJHVoBbi0zdo",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios(reqOptions)
      .then((response) => {
        alert("Check your Email");
        // console.log(response)
        navigate({ pathname: "/signin" }, { replace: true });
      })
      .catch((error) => {
        emailRef.current.value = "";
        alert("Email is invalid");
        navigate({ pathname: "/forgetPassword" }, { replace: true });
      });
  }

  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="image">
          <img
            src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?size=338&ext=jpg&ga=GA1.2.1921613389.1649405774"
            alt="sigin_image"
            width="80%"
          />
        </div>
        <div style={{ width: "30%" }}>
          <h1>Forget Password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                values={values.email || ""}
                onChange={handleChange}
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button
              id="btn-form-submit"
              type="submit"
              style={{
                backgroundColor: "#29A080",
                border: "none",
                width: "100%",
              }}
            >
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
