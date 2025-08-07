import { Row, Col, Container } from "react-bootstrap";
import "../styles/common.css";

export default function PricingPolicy() {
    return (
        <>
            <div className="pricingHeader">
                <div className="pricingTitle">
                    <h1 className="display-5 mt-auto py-3 fw-bold">Pricing Policy</h1>
                </div>
            </div>
            <Container className="py-5" style={{ fontFamily: "Poppins, sans-sarif" }}>
                <Row>
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">Pricing Policy</h5>
                        <small>Effective Date: May 01, 2025..</small>
                        <p>Our fee structure is predefined and based on academic sessions, classes, and selected services. The fee breakdown is displayed clearly before any payment is made.</p>
                    </Col>
                </Row>
                <Row className="d-flex flex-column">
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">1. No Hidden Charges</h5>
                        <p>
                            The total payable amount includes all applicable fees and taxes.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">2. Changes to Fees</h5>
                        <small>
                            We reserve the right to update pricing with prior notice.
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
