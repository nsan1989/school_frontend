import { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        console.log(data);
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

  Title("Hostel Fee")
  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
}
