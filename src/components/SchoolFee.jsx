import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Title from "../hooks/Title";

import "../styles/SchoolFee.module.css";

export default function SchoolFees() {
  const [error, setError] = useState(null);
  const [clearFees, setClearFees] = useState([]);
  const [dueFees, setDueFees] = useState([]);
  const [onPay, setOnPay] = useState([]);
  const [pending, setPending] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const clearFeesUrl = import.meta.env.VITE_SCHOOL_CLEAR_FEES_API_URL;
  const dueFeesUrl = import.meta.env.VITE_SCHOOL_DUE_FEES_API_URL;
  const onPayUrl = import.meta.env.VITE_SCHOOL_NON_PAY_API_URL;
  const pendingUrl = import.meta.env.VITE_SCHOOL_PENDING_API_URL;

  const handleShow = (fee) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFee(null);
  };

  const handlePayNow = (fee) => {
    alert(`Initiating payment for ${fee.academic_fee_name} (${fee.due_amount})`);
    window.open(paymentUrl, '_blank');
  };

  useEffect(() => {
    const fetchFees = async (url, setter) => {
      const auth_key = localStorage.getItem("auth_key");
      const id = localStorage.getItem("student_id");

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Fees");
        }
        setter(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFees(clearFeesUrl, setClearFees);
    fetchFees(dueFeesUrl, setDueFees);
    fetchFees(onPayUrl, setOnPay);
    fetchFees(pendingUrl, setPending);
  }, [clearFeesUrl, dueFeesUrl, onPayUrl, pendingUrl]);

  Title("School Fee");
  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <Row>
        <Col md={12}>
          <h5 className="fw-bold">Clear Months</h5>
        </Col>
      </Row>
      <Row className="g-3 mb-3 py-3">
        <Col xs={12} sm={6} md={4} lg={3} style={{ minHeight: "10vh" }}>
          <Link>
            <Button variant="primary" className="w-100 h-100">
              {clearFees && clearFees[0]?.length > 0 ? (
                clearFees[0].map((clearFee) => (
                  <div key={clearFee.id}>{clearFee.academic_fee_name}</div>
                ))
              ) : (
                <p>Loading Data...</p>
              )}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="fw-bold">Due Amounts</h5>
        </Col>
      </Row>
      <Row className="g-3 mb-3 py-3">
        {dueFees?.length > 0 && dueFees[0]?.length > 0 ? (
          dueFees[0].map((dueFee) => (
            <Col
              key={dueFee.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ minHeight: "10vh" }}
            >
              <Button
                className="w-100 h-100"
                variant="primary"
                onClick={() => handleShow(dueFee)}
              >
                {dueFee.academic_fee_name}
              </Button>
            </Col>
          ))
        ) : dueFees?.length > 0 ? (
          <Col>
            <Button variant="secondary" disabled>
              Loading Data...
            </Button>
          </Col>
        ) : (
          <p>No data</p>
        )}
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="fw-bold">Due Months</h5>
        </Col>
      </Row>
      <Row className="g-3 mb-3 py-3">
        {onPay && onPay.length > 0 ? (
          onPay.map((fee) => (
            <Col
              key={fee.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ minHeight: "10vh" }}
            >
              <Button className="w-100 h-100" variant="primary">
                {fee.academic_fee_name}
              </Button>
            </Col>
          ))
        ) : (
          <p>No data</p>
        )}
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="fw-bold">Upcoming Months</h5>
        </Col>
      </Row>
      <Row className="g-3 mb-3 py-3">
        {pending && pending.length > 0 ? (
          pending.map((fee) => (
            <Col
              key={fee.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ minHeight: "10vh" }}
            >
              <Button className="w-100 h-100" variant="primary">
                {fee.academic_fee_name}
              </Button>
            </Col>
          ))
        ) : (
          <p>No data</p>
        )}
      </Row>
      {/* Pop up window */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Fee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFee ? (
            <>
              <Table striped bordered hover className="w-auto">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Due Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedFee.academic_fee_name}</td>
                    <td>{selectedFee.payable_amount}</td>
                    <td>{selectedFee.amount_paid}</td>
                    <td>{selectedFee.due_amount}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className="btn-md"
                variant="success"
                onClick={() => handlePayNow(selectedFee)}
              >
                Pay Now
              </Button>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
