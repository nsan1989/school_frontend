import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import Title from "../hooks/Title";

export default function Hostel() {
  const [error, setError] = useState(null);
  const [clearFees, setClearFees] = useState([]);
  const [dueFees, setDueFees] = useState([]);
  const [onPay, setOnPay] = useState([]);
  const [pending, setPending] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const clearFeesUrl = import.meta.env.VITE_HOSTEL_CLEAR_FEES_API_URL;
  const dueFeesUrl = import.meta.env.VITE_HOSTEL_DUE_FEES_API_URL;
  const onPayUrl = import.meta.env.VITE_HOSTEL_NON_PAY_API_URL;
  const pendingUrl = import.meta.env.VITE_HOSTEL_PENDING_API_URL;

  const handleShow = (fee) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFee(null);
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

  Title("Hostel Fee");
  return (
    <>
      <div>
        <h5 className="fw-bold">Clear Months</h5>
      </div>
      <div className="mb-2 py-3">
        {clearFees && clearFees.length > 0 ? (
          clearFees.map((clearFee) => (
            <Button
              variant="outline-primary"
              className="flex-fill me-2 mb-2"
              style={{ width: "10rem" }}
              onClick={() => handleShow(clearFee)}
              key={clearFee.id}
            >
              {clearFee.type_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Due Amounts</h5>
      </div>
      <div className="mb-2 py-3">
        {dueFees && dueFees.length > 0 ? (
          dueFees.map((dueFee) => (
            <Button
              variant="outline-danger"
              className="flex-fill me-2 mb-2"
              style={{ width: "10rem" }}
              onClick={() => handleShow(dueFee)}
            >
              {dueFee.fee_name}
            </Button>
          ))
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
              {fee.fee_name}
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
              variant="outline-success"
              style={{ width: "10rem" }}
              key={dueFee.id}
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
                      <td>{selectedFee.type_name}</td>
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
