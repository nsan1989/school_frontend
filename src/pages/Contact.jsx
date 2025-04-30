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
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>CONTACT US</span>
        </div>
      </div>
      <Container>
        <Row className="py-5">
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="flex-wrap align-content-center"
          >
            <div style={{ height: "500px", width: "100%" }}>
              <Map />
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            className="flex-wrap align-content-center p-5 rounded"
          >
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
