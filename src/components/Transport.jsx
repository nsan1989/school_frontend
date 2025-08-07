import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import Title from "../hooks/Title";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function TransportFee() {
  const [error, setError] = useState(null);
  const [clearTransportFees, setTransportClearFees] = useState([]);
  const [dueFees, setDueFees] = useState([]);
  const [nonPay, setNonPay] = useState([]);
  const [pending, setPending] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const clearTransportFeesUrl = import.meta.env.VITE_TRANSPORT_CLEAR_FEES_API_URL;
  const dueFeesUrl = import.meta.env.VITE_TRANSPORT_DUE_FEES_API_URL;
  const nonPayUrl = import.meta.env.VITE_TRANSPORT_NON_FEES_API_URL;
  const pendingUrl = import.meta.env.VITE_TRANSPORT_PENDING_FEES_API_URL;
  const paymentUrl = import.meta.env.VITE_RAZOR_PAY_CREATE_ORDER
  const paymentVerify = import.meta.env.VITE_RAZOR_PAY_VERIFY

  const handleShow = (fee) => {
    setSelectedFee(fee);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFee(null);
  };

  const handleBack = () => {
    window.history.back();
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
        setter(data.msg, data.fee);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFees(clearTransportFeesUrl, setTransportClearFees);
    fetchFees(dueFeesUrl, (msg, fee) => setDueFees({ msg, fee }));
    fetchFees(nonPayUrl, (msg, fee) => setNonPay({ msg, fee }));
    fetchFees(pendingUrl, (msg, fee) => setPending({ msg, fee }));
  }, [clearTransportFeesUrl, dueFeesUrl, nonPayUrl, pendingUrl]);

  {/* Razor Pay */ }
  const handlePayNow = async (mergedFee) => {
    try {
      const auth_key = localStorage.getItem("auth_key");
      const studentId = localStorage.getItem("student_id");
      const orderRes = await fetch(
        paymentUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
          body: JSON.stringify({
            amount: parseInt(mergedFee.fee),
            student_id: parseInt(studentId),
            fee_month_id: parseInt(mergedFee.id),
            payment_reason: mergedFee?.fee ? 'REGULAR PAYMENT' : 'DUE PAYMENT',
            payment_for: 'TRANSPORT',
            invoice_id: parseInt(mergedFee.invoice_id)
          }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderRes.ok || orderData.status !== "success") {
        throw new Error(orderData.msg || "Order creation failed");
      }
      if (orderData.status === "success") {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://api.razorpay.com/v1/checkout/embedded";
        const addField = (name, value) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };
        addField("key_id", orderData.key);
        addField("order_id", orderData.order_id);
        addField("name", "CONCEPT SCHOOL");
        addField("amount", orderData.amount);
        addField("currency", "INR");
        addField("callback_url", orderData.callback_url);

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      alert("Payment failed: " + error.message);
    }
  };

  Title("Transport Fee");
  return (
    <>
      <div className="mb-3" style={{ width: "auto" }}>
        <button
          onClick={handleBack}
          className="d-flex align-items-center text-warning"
          style={{ textDecoration: "none", background: "none", border: "none", padding: 0 }}
        >
          <IoMdArrowRoundBack />&nbsp;back
        </button>
      </div>
      <div>
        <h5 className="fw-bold">Transport Fee Clear</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(clearTransportFees) && clearTransportFees.length > 0 ? (
          clearTransportFees.map((clearFee) => (
            <Button
              variant="success me-2 mb-2"
              className="flex-fill"
              style={{ width: "10rem" }}
              key={clearFee.id}
            >
              {clearFee.fee_name}
            </Button>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Transport Due Amounts</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(dueFees.msg) && dueFees.msg.length > 0 ? (
          dueFees.msg.map((feeItem, index) => (
              <Button
                variant="danger"
                className="flex-fill me-2 mb-2"
                onClick={() => handleShow({ ...dueFees.fee[index], ...dueFees.msg[index] })}
                style={{ width: "10rem" }}
                key={feeItem.id}
              >
                {feeItem.fee_name}
              </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Transport Due Fee</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(nonPay.msg) && nonPay.msg.length > 0 ? (
          nonPay.msg.map((feeItem, index) => (
            <Button
              variant="danger"
              className="flex-fill me-2 mb-2"
              onClick={() => handleShow({ ...nonPay.fee[index], ...nonPay.msg[index] })}
              key={feeItem.id}
            >
              {feeItem.fee_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 className="fw-bold">Upcoming Transport Fees</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(pending.msg) && pending.msg.length > 0 ? (
          pending.msg.map((feeItem, index) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="warning"
              style={{ width: "10rem" }}
              onClick={() => handleShow({ ...pending.fee[index], ...pending.msg[index] })}
              key={feeItem.id}
            >
              {feeItem.fee_name}
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
                      <th>Driver Name</th>
                      <th>Fee</th>
                      <th>Pickup Address</th>
                      <th>Vehicle Name</th>
                      <th>Vehicle No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedFee.driver_name}</td>
                      <td>{selectedFee.fee}</td>
                      <td>{selectedFee.pickup_address}</td>
                      <td>{selectedFee.vehicle_name}</td>
                      <td>{selectedFee.vehicle_no}</td>
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
