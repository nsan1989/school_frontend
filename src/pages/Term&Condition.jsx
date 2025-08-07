import { Row, Col, Container } from "react-bootstrap";
import Title from "../hooks/Title";

export default function TermsConditions() {
  Title("Terms&Conditions");
  return (
    <>
      <div className="termsHeader">
        <div className="termsTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold" style={{ fontWeight: "bold" }}>
            Terms & Conditions
          </h1>
        </div>
      </div>
      <div className="termsContent py-5">
        <Container style={{fontFamily:"Poppins, sans-sarif"}}>
          <Row>
            <Col className="d-flex flex-column">
              <h5>Terms and Conditions for Concept School Website</h5>
              <small>Effective Date: May 1, 2025.</small>
              <p>
                Welcome to the official website of Concept School (“we”, “our”,
                or “us”). By accessing or using this website
                (www.conceptschoolimphal.com), you agree to be bound by the
                following Terms and Conditions. Please read them carefully
                before using our site.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>1. Acceptance of Terms</h5>
              <p>
                By accessing or using the Site, you agree to comply with and be
                legally bound by these Terms. If you do not agree, please do not
                use the website.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>2. Eligibility</h5>
              <p>
                This website is intended for use by students, parents/guardians,
                staff, and general visitors. Users under the age of 18 must use
                the Site under the supervision of a parent or legal guardian.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>3. Use of Website</h5>
              <p>
                You agree to use the Site for lawful purposes only and not to:
              </p>
              <ul>
                <li>
                  Violate any applicable local, national, or international law
                </li>
                <li>Upload or transmit viruses or harmful code</li>
                <li>
                  Attempt to gain unauthorized access to any section of the site
                </li>
                <li>
                  Post or transmit any content that is defamatory, obscene, or
                  discriminatory
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>4. Intellectual Property</h5>
              <p>
                All content on this website, including text, graphics, logos,
                documents, and images, is the property of Concept School or its
                licensors and is protected under applicable intellectual
                property laws. Unauthorized use, reproduction, or distribution
                is strictly prohibited.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>5. User Submissions</h5>
              <p>
                Any data or content submitted through forms (e.g., admission
                forms, inquiries) must be truthful and accurate. You are solely
                responsible for the content you provide. We reserve the right to
                remove or block any submissions that violate these Terms.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>6. Third-Party Links</h5>
              <p>
                This website may include links to external websites for your
                convenience. Concept School does not endorse and is not
                responsible for the content or privacy practices of these
                third-party sites.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>7. Privacy</h5>
              <p>
                Your use of the Site is also governed by our Privacy Policy,
                which explains how we collect and use your personal information.
                Please review it carefully.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>8. Disclaimer</h5>
              <p>
                The information on this site is provided “as is” for general
                information purposes. While we strive to keep the content
                accurate and up to date, Concept School makes no warranties,
                express or implied, regarding the accuracy, completeness, or
                reliability of any information.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>9. Limitation of Liability</h5>
              <p>
                To the maximum extent permitted by Indian law, Concept School
                shall not be liable for any indirect, incidental, or
                consequential damages arising from your use of this site,
                including but not limited to data loss, service interruption, or
                unauthorized access.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>10. Indemnification</h5>
              <p>
                You agree to indemnify and hold harmless Concept School, its
                management, staff, and affiliates from any claims, losses, or
                damages, including legal fees, arising out of your violation of
                these Terms.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>11. Modifications</h5>
              <p>
                Concept School reserves the right to update or modify these
                Terms at any time without prior notice. Your continued use of
                the website constitutes your acceptance of the revised Terms.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>12. Governing Law and Jurisdiction</h5>
              <p>
                These Terms are governed by the laws of India. Any disputes
                arising out of the use of this website shall be subject to the
                exclusive jurisdiction of the courts located in Imphal-East, Manipur.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>13. Contact Information</h5>
              <p>
                For any questions or concerns regarding these Terms, please contact:
              </p>
              <ul className="ps-0" style={{listStyleType:"none"}}>
                <li className="fw-bold">Concept School</li>
                <li><span className="fw-bold">Address:</span> Koirengei, Near CMC Hospital, 795002.</li>
                <li><span className="fw-bold">Email:</span> conceptschoolkoirengei@gmail.com</li>
                <li><span className="fw-bold">Phone:</span> 8794728538.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
