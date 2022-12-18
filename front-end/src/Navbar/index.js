import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";

const NavigationBar = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object
  const [roles, setRoles] = useState(getRoles());

  function getRoles() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Spring Academy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {roles.find((role) => role === "ROLE_STUDENT") ? (
                <Nav.Link href="/api/courses/register">Register</Nav.Link>
              ) : (
                <></>
              )}
              {roles.find((role) => role === "ROLE_REVIEWER") ? (
                <Nav.Link href="/api/courses/submissions">
                  View Submissions
                </Nav.Link>
              ) : (
                <></>
              )}
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                onClick={() => {
                  setJwt(null);
                  window.location.href = "/login";
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
