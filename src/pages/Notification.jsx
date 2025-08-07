import { Container } from "react-bootstrap";
import Notice from "../components/Notice";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Notification() {
  Title("Notification");
  return (
    <>
      <div className="notificationHeader">
        <div className="notificationTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">NOTIFICATION</h1>
        </div>
      </div>
      <div className="notificationContent py-5">
        <Container>
          <Notice />
        </Container>
      </div>
    </>
  );
}
