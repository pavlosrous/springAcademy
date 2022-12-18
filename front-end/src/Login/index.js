import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ApiService from "../service/ApiService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt"); //store a state of an object

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendLoginRequest() {
    ApiService.LoginRequest(username, password)
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="joe@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            className="mt-2 d-flex flex-column gap-4 flex-md-row justify-content-md-between"
            md="8"
            lg="6"
          >
            <Button
              id="submit"
              type="button"
              onClick={() => sendLoginRequest()}
              variant="success"
            >
              Login
            </Button>
            <Button
              id="submit"
              type="button"
              onClick={() => (window.location.href = "/")}
              variant="secondary"
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
