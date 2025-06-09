import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Title from "../hooks/Title";

import "../styles/SchoolFee.css";

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
    alert(
      `Initiating payment for ${fee.academic_fee_name} (${fee.due_amount})`
    );
    window.open(paymentUrl, "_blank");
  };

  useEffect(() => {
    const fetchFees = async (url, setter) => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
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
      <div>
        <h5 className="fw-bold">Clear Months</h5>
      </div>
      <div className="mb-2 py-3">
        {clearFees && clearFees[0]?.length > 0 ? (
          clearFees[0].map((clearFee) => (
            <Button
              variant="outline-success me-2 mb-2"
              className="flex-fill"
              style={{ width: "10rem" }}
              key={clearFee.id}
            >
              {clearFee.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>Loading Data...</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Due Amounts</h5>
      </div>
      <div className="mb-2 py-3">
        {dueFees?.length > 0 && dueFees[0]?.length > 0 ? (
          dueFees[0].map((dueFee) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="outline-danger"
              onClick={() => handleShow(dueFee)}
              style={{ width: "10rem" }}
              key={dueFee.id}
            >
              {dueFee.academic_fee_name}
            </Button>
          ))
        ) : dueFees?.length > 0 ? (
          <p>Loading Data...</p>
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Due Months</h5>
      </div>
      <div className="mb-2 py-3">
        {onPay && onPay.length > 0 ? (
          onPay.map((fee) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="outline-danger"
              style={{ width: "10rem" }}
              key={fee.id}
            >
              {fee.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Upcoming Months</h5>
      </div>
      <div className="mb-2 py-3">
        {pending && pending.length > 0 ? (
          pending.map((fee) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="outline-warning"
              style={{ width: "10rem" }}
              key={fee.id}
            >
              {fee.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      {/* Pop up window */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Fee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFee ? (
            <>
              <div className="table-responsive">
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
              </div>
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
