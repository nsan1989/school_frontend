import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/ContactForm";
import Map from "../components/Map";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Contact() {
  Title("Contact");
  return (
    <>
      <div className="contactHeader">
        <div className="contactTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">CONTACT US</h1>
        </div>
      </div>
      <Container>
        <Row className="py-5 g-2">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="flex-wrap align-content-center"
          >
            <div style={{ height: "650px", width: "100%" }}>
              <Map />
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="flex-wrap align-content-center p-5 rounded text-light"
            style={{backgroundColor:"#004D00"}}
          >
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
