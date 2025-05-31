import { Container, Row, Col } from "react-bootstrap";

import Notes from "../components/ClassNotes";
import HomeWork from "../components/HomeWorks";
import Video from "../components/VideoClass";
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
            <Notes />
          </Col>
        </Row>
        <Row className="d-flex flex-column mb-3">
          <Col className="mb-2 border shadow-sm bg-warning rounded" md={12}>
            <h5>Home Work</h5>
          </Col>
          <Col md={12}>
            <HomeWork />
          </Col>
        </Row>
        <Row className="d-flex flex-column">
          <Col className="mb-2 border shadow-sm bg-warning rounded" md={12}>
            <h5>Online Class</h5>
          </Col>
          <Col md={12}>
            <Video />
          </Col>
        </Row>
      </Container>
    </>
  );
}
