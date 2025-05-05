import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Title from "../hooks/Title";

export default function Login() {
  Title("Login");
  return (
    <>
      <div className="loginHeader" >
        <div className="loginTitle">
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>LOGIN</span>
        </div>
      </div>
      <div className="loginForm">
        <Container>
          <Row className="py-5">
            <Col xs={12} sm={12} md={4} lg={4} xl={4}></Col>
            <Col className="rounded p-3" xs={12} sm={12} md={4} lg={4} xl={4}>
              <Form className="p-3 shadow" style={{color:"#004d00"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
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
        </Container>
      </div>
    </>
  );
}
