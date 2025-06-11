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
          <p className="m-0 py-1 text-danger">
            &#42;&nbsp;To access detailed fee information, please select the
            card below.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
          <Link
            to="/school_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                webkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ color: "#004d00" }}
              >
                <FaGraduationCap size={48} className="mb-3" />
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
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                webkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ color: "#004d00" }}
              >
                <FaHotel size={48} className="mb-3" />
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
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                webkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body 
              className="d-flex flex-column align-items-center justify-content-center"
              style={{color:"#004d00"}}
              >
                <FaBusAlt size={48} className="mb-3" />
                <Card.Title className="mb-0 fs-5">Transport Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
