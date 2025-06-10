import { Row, Col, Container } from "react-bootstrap";
import Title from "../hooks/Title";

export default function TermsConditions() {
  Title("Terms&Conditions");
  return (
    <>
      <div className="termsHeader">
        <div className="termsTitle">
          <span className="display-4 mt-auto" style={{ fontWeight: "bold" }}>
            Terms & Conditions
          </span>
        </div>
      </div>
      <div className="termsContent py-5">
        <Container>
          <Row>
            <Col className="d-flex flex-column">
              <p>
                Welcome to St. Anthony School. By accessing or using our
                platform, you agree to be bound by these Terms and Conditions.
                If you do not agree with any part of these terms, please do not
                use our services.
              </p>
              <ul>
                <li className="mb-3">
                  <h5 className="fw-bold">Use of Service</h5> This platform
                  is intended for managing school-related activities including
                  admissions, fee payments, timetable management, and
                  communication between stakeholders.
                </li>
                <li className="mb-3">
                  <h5 className="fw-bold">User Accounts</h5> You are
                  responsible for maintaining the confidentiality of your login
                  credentials and for all activities under your account.
                </li>
                <li className="mb-3">
                  <h5 className="fw-bold">Fee Payments</h5> All fee-related
                  transactions are final once confirmed. Razorpay is used as the
                  payment gateway.
                </li>
                <li className="mb-3">
                  <h5 className="fw-bold">Modifications</h5> We reserve the
                  right to modify these terms at any time. Continued use after
                  changes means you accept the revised terms.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
