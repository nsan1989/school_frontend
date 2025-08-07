import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FaGraduationCap } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa";
import { FaBusAlt } from "react-icons/fa";

export default function Fee() {

  const titleStyles = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
    color: 'white',
  }

  return (
    <>
      <Row className="py-3 d-flex justify-content-between">
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <p className="m-0 text-warning">
            &#42;&nbsp;To access detailed fee information, please select the
            card below.
          </p>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="d-flex align-items-center">
          <p className="m-0 text-warning">
            &#42;&nbsp;Transaction History.
          </p>
          &nbsp;
          <Link to="/transaction_history"><Button className="btn btn-sm btn-warning">View</Button></Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4 d-flex">
          <Link
            to="/school_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ color: "#004d00" }}
              >
                <FaGraduationCap size={48} className="mb-3" style={{color: '#e6e600'}} />
                <Card.Title className="mb-0 fs-5" style={titleStyles}>School Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4 d-flex">
          <Link
            to="/hostel_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ color: "#004d00" }}
              >
                <FaHotel size={48} className="mb-3" style={{color: '#e6e600'}} />
                <Card.Title className="mb-0 fs-5" style={titleStyles}>Hostel Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-4 d-flex">
          <Link
            to="/transport_fee"
            className="w-100 text-decoration-none text-dark"
          >
            <Card
              className="text-center shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Card.Body 
              className="d-flex flex-column align-items-center justify-content-center"
              style={{color:"#004d00"}}
              >
                <FaBusAlt size={48} className="mb-3" style={{color: '#e6e600'}} />
                <Card.Title className="mb-0 fs-5" style={titleStyles}>Transport Fee</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
