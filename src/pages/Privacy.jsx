import { Row, Col, Container } from "react-bootstrap";
import "../styles/common.css";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="privacyHeader">
        <div className="privacyTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">Privacy Policy</h1>
        </div>
      </div>
      <Container className="py-5" style={{ fontFamily: "Poppins, sans-sarif" }}>
        <Row>
          <Col className="d-flex flex-column">
            <h5 className="m-0">Privacy Policy for Concept School Website</h5>
            <small>Effective Date: May 01, 2025.</small>
            <p className="mt-2">
              Concept School ("we", "our", or "us") respects the privacy of
              every individual who visits our website
              (www.conceptschoolimphal.com) (the “Site”). This Privacy Policy
              outlines how we collect, use, and protect your personal
              information in accordance with Indian laws, including the
              Information Technology Act, 2000 and the associated Rules.
            </p>
          </Col>
        </Row>
        <Row className="d-flex flex-column">
          <Col className="d-flex flex-column">
            <h5 className="m-0">1. Information We Collect</h5>
            <small>
              We may collect and store the following types of information when
              you use our Site:
            </small>
            <p>
              a. Personal Information (as per Rule 3 of the IT Rules, 2011):
            </p>
            <ul className="ps-0" style={{ listStyleType: "none" }}>
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Postal address</li>
              <li>Student details</li>
              <li>Parent/Guardian contact details</li>
            </ul>
          </Col>
          <Col className="d-flex flex-column">
            <p>
              b. Sensitive Personal Data or Information (SPDI) (if provided):
            </p>
            <ul className="ps-0" style={{ listStyleType: "none" }}>
              <li>Passwords</li>
              <li>Financial Information</li>
              <li>Health-related information</li>
            </ul>
          </Col>
          <Col className="d-flex flex-column">
            <p>c. Non-Personal Information:</p>
            <ul className="ps-0" style={{ listStyleType: "none" }}>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Cookies and website usage data</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h5 className="m-0">2. Purpose of Collection</h5>
            <small>
              We collect this information for the following purposes:
            </small>
            <ul className="mt-2 ps-0" style={{ listStyleType: "none" }}>
              <li>To process admissions or inquiries</li>
              <li>To communicate with students and parents</li>
              <li>To provide academic and administrative services</li>
              <li>To issue updates, circulars, and newsletters</li>
              <li>To enhance website functionality and user experience</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h5>3. Consent</h5>
            <p>
              By using this Site and submitting your information, you consent to
              the collection and use of your information in accordance with this
              Privacy Policy. For students under the age of 18, consent must be
              provided by a parent or legal guardian.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h5>4. Disclosure of Information</h5>
            <small>
              We do not share your personal information with third parties
              except:
            </small>
            <ul className="mt-2 ps-0" style={{ listStyleType: "none" }}>
              <li>With authorized school staff and departments</li>
              <li>
                With vendors or service providers under contract (e.g., for
                website hosting, online learning tools)
              </li>
              <li>
                When required by law, legal process, or regulatory authority
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>5. Data Retention and Security</h5>
            <small>
              We retain your personal information only as long as necessary for
              the purposes outlined. We implement reasonable security practices
              including:
            </small>
            <ul className="mt-2 ps-0" style={{ listStyleType: "none" }}>
              <li>Access Control</li>
              <li>Data Encryption</li>
              <li>Secure Storage</li>
              <li>Regular Audits</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>6. Children's Privacy</h5>
            <p>
              We do not knowingly collect information from children under the
              age of 18 without verified parental consent. Parents/guardians may
              contact us to access, update, or delete their child’s personal
              data.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>7. User Rights</h5>
            <small>As per Indian IT Rules, users have the right to:</small>
            <ul className="mt-2 ps-0" style={{ listStyleType: "none" }}>
              <li>Review the information provided</li>
              <li>Correct any inaccuracies</li>
              <li>Withdraw consent (subject to legal obligations)</li>
              <li>Request deletion of their personal information</li>
            </ul>
            <small>
              To exercise these rights, please contact us at the details below.
            </small>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>8. Third-Party Links</h5>
            <p>
              Our Site may contain links to other websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies independently.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>9. Policy Updates</h5>
            <p>
              We may update this Privacy Policy periodically. All changes will
              be posted on this page with an updated effective date.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h5>10. Contact Us</h5>
            <p className="mb-0">
              If you have any questions or concerns about this policy, please
              contact:
            </p>
            <ul className="mt-2 ps-0" style={{ listStyleType: "none" }}>
              <li className="fw-bold">Concept School Imphal,</li>
              <li>
                <span className="fw-bold">Address:</span>&nbsp;Koirengei, Near CMC
                Hospital, 795002.
              </li>
              <li>
                <span className="fw-bold">Email:</span>&nbsp;
                conceptschoolkoirengei@gmail.com
              </li>
              <li>
                <span className="fw-bold">Phone:</span>&nbsp;8794728538
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}
