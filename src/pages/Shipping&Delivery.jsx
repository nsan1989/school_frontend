import { Row, Col, Container } from "react-bootstrap";
import "../styles/common.css";

export default function ShippingDelivery() {
    return (
        <>
            <div className="shippingHeader">
                <div className="shippingTitle text-center">
                    <h1 className="display-5 mt-auto py-3 fw-bold">Shipping and Delivery</h1>
                </div>
            </div>
            <Container className="py-5" style={{ fontFamily: "Poppins, sans-sarif" }}>
                <Row>
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">Shipping and Deliveries</h5>
                        <small>Effective Date: May 01, 2025..</small>
                        <p>
                            Since this is a digital platform, no physical goods are shipped. However, payment/transaction information are provided in the platform. User can see the records by Login through the platform
                        </p>
                    </Col>
                </Row>
                <Row className="d-flex flex-column">
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">1. Eligibility</h5>
                        <p>
                            Refunds are granted only in cases of excess payment,
                            duplicate payment, or withdrawal of admission before the deadline.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">2. Process</h5>
                        <small>
                            To request a refund, please contact us at
                            conceptschoolkoirengei@gmail.com with proof of payment and
                            reason for refund.
                        </small>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-column">
                        <h5 className="m-0">3. Timeline</h5>
                        <p>
                            Approved refunds will be processed within 7–14 working days.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
