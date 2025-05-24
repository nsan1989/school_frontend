import { useState } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";

import login_image from "../assets/login_image.svg";
import "../styles/StudentLogin.css";

export default function StudentLogin() {
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_LOGIN_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObject = {
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });
      const result = await response.json();

      if (response.ok && result.status === "success") {
        const { id, auth_key } = result.msg[0];
        localStorage.setItem("student_id", id);
        localStorage.setItem("auth_key", auth_key);
        window.location.href = "/dashboard";
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-evenly shadow py-5 g-3 rounded glassmorphism">
        <Col className="d-none d-md-flex" md={4}>
          <Image className="img-fluid" src={login_image} />
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          md={4}
        >
          <Form
            onSubmit={handleSubmit}
            style={{ color: "#004d00" }}
            className="w-100"
          >
            <div className="form-title">
              <h3 className="text-center pb-3 fw-bold">WELCOME BACK</h3>
            </div>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
