import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import AuthContext from "../../Store/auth-context";
import axios from "axios";

const NavigationBar = () => {
  const authCtx = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");

  if (authCtx.isLoggedIn) {
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let bodyContent = {
      idToken: authCtx.token,
    };

    let reqOptions = {
      url: "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNlkjPgbkBTKxeDo-wxYbIJHVoBbi0zdo",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    axios(reqOptions)
      .then((response) => {
        setUserEmail(response.data.users[0].email);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PEXEL
          </Navbar.Brand>
          <Nav className="justify-content-around">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: "white",
                minWidth: "5rem",
                textAlign: "center",
                marginRight: "1rem",
              }}
            >
              Home
            </Nav.Link>
            {!authCtx.isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/signin"
                style={{
                  color: "white",
                  backgroundColor: "#05a081",
                  borderRadius: "5px",
                  minWidth: "6rem",
                  textAlign: "center",
                  marginRight: "1rem",
                }}
              >
                Signin
              </Nav.Link>
            )}
            {authCtx.isLoggedIn && (
              <NavDropdown title={userEmail} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/fav">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/changepassword">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
