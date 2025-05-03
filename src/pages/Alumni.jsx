import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import AlumniContent from "../components/AlumniContent";

export default function Alumni() {
  Title("Alumni");
  return (
    <>
      <div className="alumniHeader">
        <div className="alumniTitle">
          <span className="display-3 mt-auto" style={{ fontWeight: "bold" }}>
            ALUMNI
          </span>
        </div>
      </div>
      <div
        className="alumniContent py-5"
      >
        <Container>
          <AlumniContent />
        </Container>
      </div>
    </>
  );
}
