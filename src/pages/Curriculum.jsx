import { Container, Row, Col } from "react-bootstrap";

import Subjects from "../components/Subjects";
import Title from "../hooks/Title";

export default function Curriculums() {
  Title("Curriculum");
  return (
    <>
      <Container>
        <Row className="d-flex flex-column mb-3">
          <Col className="mb-2 border shadow-sm bg-warning rounded" md={12}>
            <h5>Class Notes</h5>
          </Col>
          <Col md={12}>
            <Subjects />
          </Col>
        </Row>
        <Row className="d-flex flex-column">
          <Col className="mb-2 border shadow-sm bg-warning rounded" md={12}>
            <h5>Home Work</h5>
          </Col>
          <Col md={12}>
            <Subjects />
          </Col>
        </Row>
      </Container>
    </>
  );
}
