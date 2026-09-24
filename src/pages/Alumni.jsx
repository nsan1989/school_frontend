import { Container } from "react-bootstrap";
import "../styles/Common.css";
import Title from "../hooks/Title";

export default function AlumniPage() {
  Title("Alumni");
  return (
    <>
      <div className="alumniHeader">
        <div className="alumniTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">ALUMNI</h1>
        </div>
      </div>
      <div className="alumniContent">
        <Container>
            <p>No contents available!</p>
        </Container>
      </div>
    </>
  );
}
