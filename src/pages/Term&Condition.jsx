import { Row, Col, Container } from "react-bootstrap";
import Title from "../hooks/Title";

export default function TermsConditions() {
  Title("Terms&Conditions");
  return (
    <>
      <div className="termsHeader">
        <div className="termsTitle">
          <h1
            className="display-5 mt-auto py-3 fw-bold"
            style={{ fontWeight: "bold" }}
          >
            Terms & Conditions
          </h1>
        </div>
      </div>
      <div className="termsContent py-5">
        <Container style={{ fontFamily: "Poppins, sans-sarif" }}>
          <Row>
            <Col className="d-flex flex-column">
              <h5>Terms and Conditions for School Website</h5>
              <p>
                Welcome to St. Anthony School. By accessing or using our
                platform, you agree to be bound by these Terms and Conditions.
                If you do not agree with any part of these terms, please do not
                use our services.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Use of Service</h5>
              <p>
                This platform is intended for managing school-related activities
                including admissions, fee payments, timetable management, and
                communication between stakeholders.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>User Accounts</h5>
              <p>
                You are responsible for maintaining the confidentiality of your
                login credentials and for all activities under your account.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Fee Payments</h5>
              <p>
                All fee-related transactions are final once confirmed. Razorpay
                is used as the payment gateway.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Modifications</h5>
              <p>
                We reserve the right to modify these terms at any time.
                Continued use after changes means you accept the revised terms.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
