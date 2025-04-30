import { Container } from "react-bootstrap";
import Notice from "../components/Notice";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Notification() {
  Title("Notification");
  return (
    <>
      <div className="notificationHeader" >
        <div className="notificationTitle">
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>NOTIFICATION</span>
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
