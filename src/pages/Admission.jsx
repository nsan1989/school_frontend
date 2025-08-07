import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Admission() {
  Title("Admission");
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return (
    <>
      <Container className="mt-5 py-5">
        <div className="py-2 text-center">
          <p className="m-0">
            To check your application status{" "}
            <Link
              className="text-warning"
              to="/application"
              style={{ textDecoration: "none" }}
            >
              click here.
            </Link>
          </p>
        </div>
        <Row className="py-2 d-flex justify-content-center text-light py-4">
          <Col
            className="p-3 shadow-lg rounded"
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            style={{ backgroundColor: "#202060" }}
          >
            <h3 className="text-center text-white mb-4">
              {currentYear} - {nextYear}
            </h3>
            <Register />
          </Col>
        </Row>
      </Container>
    </>
  );
}
