import { useState, useEffect } from "react";
import { Row, Col, Table } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Transaction() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_TRANSACTION_HISTORY;

    //back to previous page
    const handleBack = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchData = async () => {
            const auth_key = localStorage.getItem("auth_key");
            const id = parseInt(localStorage.getItem("student_id"));

            if (isNaN(id)) {
                setError("Invalid student ID");
                return;
            }

            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: auth_key,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const data = await response.json();
                console.log(data)
                setHistory(data.msg);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    {/* styles */ }
    const titleStyle = {
        fontFamily: 'Poppins, sans-serif',
        color: 'wheat',
        fontWeight: 'bold',
    }
    const tableHeaderStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1rem',
    }
    const tableBodyStyle = {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.9rem',
    }
    {/* styles */ }

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
            <Row>
                <Col>
                    <h3 className="mb-3" style={titleStyle}>Transaction History</h3>
                </Col>
            </Row>
            <Row>
                <Col className="table-responsive">
                    <Table striped bordered hover>
                        <thead className="table-warning" style={tableHeaderStyle}>
                            <tr>
                                <th>Fee Name</th>
                                <th>Amount</th>
                                <th>Reason</th>
                                <th>Payment ID</th>
                                <th>Session</th>
                                <th>Transaction Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-info" style={tableBodyStyle}>
                            {Array.isArray(history) && history.length > 0 ? (
                                history.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.academic_fee_name}</td>
                                        <td>{item.fee_amount}</td>
                                        <td>{item.payment_reason}</td>
                                        <td>{item.razorpay_payment_id}</td>
                                        <td>{item.session_name}</td>
                                        <td>{item.transaction_date}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data!</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}
