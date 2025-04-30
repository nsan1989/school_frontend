import { Container } from "react-bootstrap";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Examination() {
  Title("Examination");
  return (
    <>
      <div className="examinationHeader" >
        <div className="examinationTitle">
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>EXAMINATION</span>
        </div>
      </div>
      <div className="examinationContent py-5">
        <Container>
          <p>Content will be updated soon.</p>
        </Container>
      </div>
    </>
  );
}
