import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import Title from "../hooks/Title";

export default function TransportFee() {
  const [error, setError] = useState(null);
  const [clearFees, setClearFees] = useState([]);
  const [dueFees, setDueFees] = useState([]);
  const [nonPay, setNonPay] = useState([]);
  const [pending, setPending] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const clearFeesUrl = import.meta.env.VITE_TRANSPORT_CLEAR_FEES_API_URL;
  const dueFeesUrl = import.meta.env.VITE_TRANSPORT_DUE_FEES_API_URL;
  const nonPayUrl = import.meta.env.VITE_TRANSPORT_NON_PAY_API_URL;
  const pendingUrl = import.meta.env.VITE_TRANSPORT_PENDING_API_URL;

  const handleShow = (fee) => {
    setSelectedMonth(fee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMonth(null);
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
    fetchFees(nonPayUrl, setNonPay);
    fetchFees(pendingUrl, setPending);
  }, [clearFeesUrl, dueFeesUrl, nonPayUrl, pendingUrl]);

  Title("Transport Fee");
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
              onClick={() => handleShow(clearFee)}
              style={{ width: "10rem" }}
              key={clearFee.id}
            >
              {clearFee.fee_name}
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
              onClick={() => handleShow(dueFee)}
              style={{ width: "10rem" }}
              key={dueFee.id}
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
        {nonPay && nonPay.length > 0 ? (
          nonPay.map((fee) => (
            <Button
              variant="outline-danger"
              className="flex-fill me-2 mb-2"
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
          {selectedMonth ? (
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
                      <td>{selectedMonth.fee_name}</td>
                      <td>{selectedMonth.payable_amount}</td>
                      <td>{selectedMonth.amount_paid}</td>
                      <td>{selectedMonth.due_amount}</td>
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
