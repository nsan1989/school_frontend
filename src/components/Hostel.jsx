import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import Title from "../hooks/Title";
import { IoMdArrowRoundBack } from "react-icons/io";

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
  const onPayUrl = import.meta.env.VITE_HOSTEL_NON_FEES_API_URL;
  const pendingUrl = import.meta.env.VITE_HOSTEL_PENDING_FEES_API_URL;
  const paymentUrl = import.meta.env.VITE_RAZOR_PAY_CREATE_ORDER

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
    fetchFees(clearFeesUrl, setClearFees);
    fetchFees(dueFeesUrl, (msg, fee) => setDueFees({ msg, fee }));
    fetchFees(onPayUrl, (msg, fee) => setOnPay({ msg, fee }));
    fetchFees(pendingUrl, (msg, fee) => setPending({ msg, fee }));
  }, [clearFeesUrl, dueFeesUrl, onPayUrl, pendingUrl]);

  {/* Razor Pay */ }
  const handlePayNow = async (mergedFee) => {
    try {
      const auth_key = localStorage.getItem("auth_key");
      const studentId = localStorage.getItem("student_id");
      const isDuePayment = !!mergedFee?.due_amount;
      const orderRes = await fetch(
        paymentUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
          body: JSON.stringify({
            amount:
              parseInt(mergedFee?.due_amount ??
                mergedFee?.fee ??
                0),
            student_id: parseInt(studentId),
            fee_month_id: mergedFee.id,
            payment_reason: mergedFee?.fee ? 'REGULAR PAYMENT' : 'DUE PAYMENT',
            payment_for: 'HOSTEL',
            ...(isDuePayment ? { invoice_id: parseInt(mergedFee.invoice_id) } : {}),
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

  Title("Hostel Fee");
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
        <h5 className="fw-bold">Hostel Fee Clear</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(clearFees) && clearFees.length > 0 ? (
          clearFees.map((clearFee) => (
            <Button
              variant="success"
              className="flex-fill me-2 mb-2"
              style={{ width: "12rem" }}
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
        <h5 className="fw-bold">Hostel Due Amounts</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(dueFees?.msg) && dueFees.msg.length > 0 ? (
          dueFees.msg.map((feeItem) => {
            const feeData = Array.isArray(dueFees?.fee) && dueFees.fee.length > 0
              ? dueFees.fee[0]
              : {};
            const mergedData = { ...feeItem, ...feeData };

            return (
              <Button
                variant="danger"
                className="flex-fill me-2 mb-2"
                style={{ width: "10rem" }}
                onClick={() => handleShow(mergedData)}
                key={feeItem.id}
              >
                {feeItem.type_name}
              </Button>
            );
          })
        ) : (
          <p>No data</p>
        )}

      </div>
      <div>
        <h5 className="fw-bold">Hostel Fee Non payment</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(onPay?.msg) && onPay.msg.length > 0 ? (
          onPay.msg.map((feeItem) => {
            const feeData = onPay.fee?.[0];
            const mergedData = { ...feeItem, ...feeData };

            return (
              <Button
                variant="danger"
                className="flex-fill me-2 mb-2"
                style={{ width: "10rem" }}
                onClick={() => handleShow(mergedData)}
                key={feeItem.id}
              >
                {feeItem.type_name}
              </Button>
            );
          })
        ) : (
          <p>No data</p>
        )}

      </div>
      <div>
        <h5 className="fw-bold">Upcoming Hostel Fees</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(pending?.msg) && pending.msg.length > 0 ? (
          pending.msg.map((feeItem) => {
            const feeData = pending.fee?.[0];
            const mergedData = { ...feeItem, ...feeData };

            return (
              <Button
                variant="danger"
                className="flex-fill me-2 mb-2"
                style={{ width: "10rem" }}
                onClick={() => handleShow(mergedData)}
                key={feeItem.id}
              >
                {feeItem.type_name}
              </Button>
            );
          })
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
                      <th>Payable Amount</th>
                      <th>Amount Paid</th>
                      <th>Due Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedFee.type_name}</td>
                      <td> {selectedFee.payable_amount ? selectedFee.payable_amount : selectedFee.fee}</td>
                      <td> {selectedFee.amount_paid ?? 0}</td>
                      <td>{selectedFee.due_amount ?? 0}</td>
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
