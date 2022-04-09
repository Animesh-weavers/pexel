import React, { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import AuthContext from "../../Store/auth-context";

const NavigationBar = () => {
  const authCtx = useContext(AuthContext);
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
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/fav">
                  Fav Pic
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
