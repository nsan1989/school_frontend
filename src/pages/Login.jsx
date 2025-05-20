import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import StudentLogin from "../components/StudentLogin";

export default function Login() {
  Title("Login");
  return (
    <>
      <div className="loginHeader">
        <div className="loginTitle">
          <span className="display-3 mt-auto" style={{ fontWeight: "bold" }}>
            LOGIN
          </span>
        </div>
      </div>
      <div className="loginForm">
        <Container>
          <StudentLogin />
        </Container>
      </div>
    </>
  );
}
