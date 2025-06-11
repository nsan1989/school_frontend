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
          <Row className="d-flex flex-column">
            <Col className="d-flex flex-column">
              <p style={{ color: "#004d00" }}>
                Welcome to St. Anthony School. By accessing or using our
                platform, you agree to be bound by these Terms and Conditions.
                If you do not agree with any part of these terms, please do not
                use our services.
              </p>
              <ul
                className="ps-0"
                style={{ listStyleType: "none", fontSize: "0.9rem" }}
              >
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Use of Service</span> <br /> This
                  platform is intended for managing school-related activities
                  including admissions, fee payments, timetable management, and
                  communication between stakeholders.
                </li>
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">User Accounts</span> <br /> You are
                  responsible for maintaining the confidentiality of your login
                  credentials and for all activities under your account.
                </li>
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Fee Payments</span> <br /> All
                  fee-related transactions are final once confirmed. Razorpay is
                  used as the payment gateway.
                </li>
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Modifications</span> <br /> We
                  reserve the right to modify these terms at any time. Continued
                  use after changes means you accept the revised terms.
                </li>
              </ul>
            </Col>
            <Col className="d-flex flex-column">
              <h5 className="fw-bold" style={{ color: "#004d00" }}>
                Privacy Policy
              </h5>
              <p style={{ color: "#004d00" }}>
                Our fee structure is predefined and based on academic sessions,
                classes, and selected services. The fee breakdown is displayed
                clearly before any payment is made.
              </p>
              <ul
                className="ps-0"
                style={{ listStyleType: "none", fontSize: "0.9rem" }}
              >
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">No Hidden Charges</span> <br /> The
                  total payable amount includes all applicable fees and taxes.
                </li>
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Changes to Fees</span> <br /> We
                  reserve the right to update pricing with prior notice.
                </li>
              </ul>
            </Col>
            <Col className="d-flex flex-column">
              <h5 className="fw-bold" style={{ color: "#004d00" }}>
                Shipping and Deliveries
              </h5>
              <p style={{ color: "#004d00" }}>
                Since this is a digital platform, no physical goods are shipped.
                However, access credentials and receipts will be delivered via
                email and/or SMS.
              </p>
              <ul
                className="ps-0"
                style={{ listStyleType: "none", fontSize: "0.9rem" }}
              >
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Delivery Time</span> <br /> Login
                  credentials are sent immediately upon successful registration.
                  Receipts are generated instantly after payment.
                </li>
                <li className="mb-3" style={{ color: "#004d00" }}>
                  <span className="fw-bold">Technical Failures</span> <br /> In
                  case of failure to receive credentials or receipts, please
                  contact support at anthonyimp83@gmail.com.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
