import { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Title from "../hooks/Title";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SchoolFees() {
  const [error, setError] = useState(null);
  const [clearFees, setClearFees] = useState([]);
  const [dueFees, setDueFees] = useState([]);
  const [onPay, setOnPay] = useState([]);
  const [pending, setPending] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedDueFee, setSelectedDueFee] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const clearFeesUrl = import.meta.env.VITE_SCHOOL_CLEAR_FEES_API_URL;
  const dueFeesUrl = import.meta.env.VITE_SCHOOL_DUE_FEES_API_URL;
  const onPayUrl = import.meta.env.VITE_SCHOOL_NON_PAY_API_URL;
  const pendingUrl = import.meta.env.VITE_SCHOOL_PENDING_API_URL;
  const paymentUrl = import.meta.env.VITE_RAZOR_PAY_CREATE_ORDER;
  const paymentVerify = import.meta.env.VITE_RAZOR_PAY_VERIFY;

  //Fee open modal
  const handleShow = (fee) => {
    setShowModal(true);
    setSelectedFee(fee);
  };

  //Fee close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedFee(null);
  };

  //Detail open modal
  const handleShowModal = (dueFee) => {
    setShowDetailModal(true);
    setSelectedDueFee(dueFee);
  }

  //Detail close modal
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedDueFee(null);
  };

  //back to previous page
  const handleBack = () => {
    window.history.back();
  };

  //fetch fee api data
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

  {/* Razor Pay */ }
  const handlePayNow = async (fee) => {
    try {
      const auth_key = localStorage.getItem("auth_key");
      const studentId = localStorage.getItem("student_id");
      const isDuePayment = !!fee?.due_amount;
      const orderRes = await fetch(
        paymentUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
          body: JSON.stringify({
            amount: parseInt(fee?.academic_fee_amount ??fee?.due_amount ?? 0),
            student_id: parseInt(studentId),
            payment_reason: fee?.academic_fee_amount ? 'REGULAR PAYMENT' : 'DUE PAYMENT',
            payment_for: 'ACADEMIC',
            ...(isDuePayment ? { invoice_id: parseInt(fee.invoice_id) } : {fee_month_id: parseInt(fee.id)}),
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

        const orderId = orderData.order_id;

        addField("key_id", orderData.key);
        addField("order_id", orderId);
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

  {/* styles */ }
  const titleStyles = {
    fontFamily: 'Poppins, sans-serif',
  }
  const thStyles = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
  }
  const tbStyles = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.9rem',
  }
  {/* styles */ }

  Title("School Fee");
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
        <h5 style={titleStyles}>Academic Fee Clear</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(clearFees?.[0]) && clearFees[0].length > 0 ? (
          clearFees[0].map((clearFee) => (
            <Button
              variant="success me-2 mb-2"
              className="flex-fill"
              style={{ width: "10rem" }}
              key={clearFee.id}
            >
              {clearFee.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>No Data...</p>
        )}
      </div>
      <div>
        <h5 style={titleStyles}>Due History</h5>
      </div>
      <div className="mb-2 py-3 table-responsive">
        <Table>
          <thead className="table-warning" style={thStyles}>
            <tr>
              <th>
                Invoice
              </th>
              <th>
                Total Amount
              </th>
              <th>
                Amount Paid
              </th>
              <th>
                Payment Date
              </th>
              <th>
                Due Amount
              </th>
              <th>
                Pay
              </th>
              <th>
                Details
              </th>
            </tr>
          </thead>
          <tbody className="table-info" style={tbStyles}>
            {Array.isArray(dueFees?.payment) && dueFees.payment.length > 0 ? (
              dueFees.payment.map((dueFee) => (
                <tr key={dueFee.invoice_id}>
                  <td>{dueFee.invoice}</td>
                  <td>₹{dueFee.payable_amount}</td>
                  <td>₹{dueFee.amount_paid}</td>
                  <td>{dueFee.payment_date}</td>
                  <td>₹{dueFee.due_amount}</td>
                  <td>
                    <Button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        const match = dueFees?.details?.filter((group) =>
                          group?.some((item) => item.fee_payment_id === dueFee.invoice_id)
                        );
                        setSelectedFee({
                          ...dueFee,
                          details: match || [],
                          payment: dueFees?.payment || [],
                        });
                        setShowModal(true);
                      }}
                    >
                      Proceed Payment
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        const match = dueFees?.details?.filter((group) =>
                          group?.some((item) => item.fee_payment_id === dueFee.invoice_id)
                        );
                        setSelectedDueFee({
                          ...dueFee,
                          details: match || [],
                          payment: dueFees?.payment || [],
                        });
                        setShowDetailModal(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Data!</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <h5 style={titleStyles}>Non Payment Fee History</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(onPay) && onPay.length > 0 ? (
          onPay.map((nonPay) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="danger"
              onClick={() => handleShow(nonPay)}
              style={{ width: "10rem" }}
              key={nonPay.id}
            >
              {nonPay.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h5 style={titleStyles}>Upcoming Fee</h5>
      </div>
      <div className="mb-2 py-3">
        {Array.isArray(pending) && pending.length > 0 ? (
          pending.map((pendingfee) => (
            <Button
              className="flex-fill me-2 mb-2"
              variant="warning"
              style={{ width: "10rem" }}
              onClick={() => handleShow(pendingfee)}
              key={pendingfee.id}
            >
              {pendingfee.academic_fee_name}
            </Button>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      {/* Fee Pop up window */}
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
                      {selectedFee?.academic_fee_name && <th>Name</th>}
                      <th>Payable Amount</th>
                      <th>Amount Paid</th>
                      <th>Due Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {selectedFee?.academic_fee_name && <td>{selectedFee.academic_fee_name}</td>}
                      <td>{selectedFee.payable_amount ?? selectedFee.academic_fee_amount ?? 'NA'}</td>
                      <td>{selectedFee.amount_paid ?? 'NA'}</td>
                      <td>{selectedFee.due_amount ?? 'NA'}</td>
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

      {/* Details Pop up window */}
      <Modal show={showDetailModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Fee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDueFee ? (
            <>
              <div className="table-responsive">
                <Table striped bordered hover className="w-auto">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Total Amount</th>
                      <th>Amount Paid</th>
                      <th>Due Amount</th>
                      <th>Payment Date</th>
                      <th>Invoice No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(selectedDueFee?.payment) && selectedDueFee.payment.length > 0 ? (
                      selectedDueFee.payment
                        .filter((payItem) =>
                          selectedDueFee.details?.some(
                            (group) =>
                              Array.isArray(group) &&
                              group.length > 0 &&
                              group[0].fee_payment_id === payItem.id
                          )
                        )
                        .map((payItem) => {
                          const relatedDetails = selectedDueFee.details.find(
                            (group) =>
                              Array.isArray(group) &&
                              group.length > 0 &&
                              group[0].fee_payment_id === payItem.id
                          );

                          const feeNames = relatedDetails
                            ? relatedDetails.map((item) => item.academic_fee_name).join(", ")
                            : "—";

                          return (
                            <tr key={payItem.id}>
                              <td>{feeNames}</td>
                              <td>₹{payItem.payable_amount}</td>
                              <td>₹{payItem.amount_paid}</td>
                              <td>₹{payItem.due_amount}</td>
                              <td>{payItem.payment_date}</td>
                              <td>{payItem.invoice}</td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan="6">No Details!</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
