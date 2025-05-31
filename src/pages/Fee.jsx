import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Fee() {
  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Link to="/school_fee">
            <Card>
              <Card.Title>School Fee</Card.Title>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
          <Link to="/hostel_fee">
            <Card>
              <Card.Title>Hostel Fee</Card.Title>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
