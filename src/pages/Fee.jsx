import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FaGraduationCap } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";

export default function Fee() {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <p style={{color:"#004d00"}}>&#42;&nbsp;To view all the fee details select the card below.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Link
            to="/school_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card className="text-center shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <FaGraduationCap size={48} className="mb-3 text-primary" />
                <Card.Title className="mb-0 fs-5">School Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Link
            to="/hostel_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card className="text-center shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <FaHotel size={48} className="mb-3 text-primary" />
                <Card.Title className="mb-0 fs-5">Hostel Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Link
            to="/transport_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card className="text-center shadow-lg border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <FaBusAlt size={48} className="mb-3 text-primary" />
                <Card.Title className="mb-0 fs-5">Transport Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
