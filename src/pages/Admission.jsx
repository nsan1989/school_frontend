import { Container, Row, Col } from "react-bootstrap";
import Register from "../components/Register";
import Title from "../hooks/Title";
import SlideUp from "../hooks/SlideUp";

import "../styles/Common.css";

export default function Admission() {
  Title("Admission");

  return (
    <>
      <Container>
        <Row className="py-5 d-flex justify-content-center">
          <Col>
            <SlideUp>
              <Register />
            </SlideUp>
          </Col>
        </Row>
      </Container>
    </>
  );
}
