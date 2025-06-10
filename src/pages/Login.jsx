import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import StudentLogin from "../components/StudentLogin";

import "../styles/login.module.css";

export default function Login() {
  Title("Login");
  return (
    <>
      <div className="loginForm vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <StudentLogin />
        </Container>
      </div>
    </>
  );
}
