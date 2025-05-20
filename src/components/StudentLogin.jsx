import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

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

      if (
        response.ok &&
        result.status === "success"
      ) {
       const { id, auth_key } = result.msg[0];
        localStorage.setItem("student_id", id);
        localStorage.setItem("auth_key", auth_key);
        window.open("/students", "_blank");
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Row className="py-5">
        <Col xs={12} sm={12} md={4} lg={4} xl={4}></Col>
        <Col className="rounded p-3" xs={12} sm={12} md={4} lg={4} xl={4}>
          <Form
            onSubmit={handleSubmit}
            className="p-3 shadow"
            style={{ color: "#004d00" }}
          >
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
        <Col xs={12} sm={12} md={4} lg={4} xl={4}></Col>
      </Row>
    </>
  );
}
