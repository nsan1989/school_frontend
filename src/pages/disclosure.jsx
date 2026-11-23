import { Card, Col, Container, Row } from "react-bootstrap";
import "../styles/Common.css";
import Title from "../hooks/Title";
import affiliation from "../assets/affiliation.pdf";
import society from "../assets/society.pdf";
import noc from "../assets/noc.pdf";
import building_safety from "../assets/building_safety.pdf";
import fire_safety from "../assets/fire_safety.pdf";
import transport_safety from "../assets/transport_safety.pdf";
import water_safety from "../assets/water_safety.pdf";
import ptm from "../assets/ptm.pdf";
import affidavit from "../assets/affidavit.pdf";
import result from "../assets/result.pdf";
import fees from "../assets/fees.pdf";
import planner from "../assets/planner.pdf";
import mandatory from "../assets/mandatory.pdf";

const certificates = [
  { title: "Mandatory Certificate", file: mandatory },
  { title: "Affiliation Certificate", file: affiliation },
  { title: "Society Certificate", file: society },
  { title: "NOC Certificate", file: noc },
  { title: "Building Safety Certificate", file: building_safety },
  { title: "Fire Safety Certificate", file: fire_safety },
  { title: "Transport Safety Certificate", file: transport_safety },
  { title: "Water Safety Certificate", file: water_safety },
  { title: "Parent's Teacher Meeting Certificate", file: ptm },
  { title: "Affidavit Certificate", file: affidavit },
  { title: "Result Certificate", file: result },
  { title: "Annual Fees", file: fees },
  { title: "Year Planner", file: planner },
];

export default function DisclosurePage() {
  Title("Public Disclosure");
  return (
    <>
      <div className="aboutHeader">
        <div className="aboutTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">DISCLOSURE</h1>
        </div>
      </div>
      <Container className="py-5">
        <div className="disclosure-heading mb-4 text-center">
          <h3 className="fw-bold" style={{ color: "#004D00" }}>
            List of all Certificates
          </h3>
          <p className="mb-0 text-muted">
            View or download the school certificates and documents.
          </p>
        </div>
        <Row className="disclosure-grid g-4">
          {certificates.map((certificate) => (
            <Col key={certificate.title} xs={12} sm={6} lg={4}>
              <Card className="disclosure-card h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="disclosure-card-title fw-bold"
                  >
                    {certificate.title}
                  </Card.Title>
                  <Card.Link
                    className="disclosure-card-link mt-auto"
                    href={certificate.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
