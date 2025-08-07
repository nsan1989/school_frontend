import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Title from "../hooks/Title";
import { useNavigate } from "react-router-dom";

export default function TransactionSuccess() {
    Title("Payment Success");
    const [params] = useSearchParams();
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);
    const OrderDetails = import.meta.env.VITE_ORDER_DETAILS;
    const razorpayOrderId = params.get("order_id");
    const auth_key = localStorage.getItem("auth_key");
    const navigate = useNavigate();

    useEffect(() => {
        if (!razorpayOrderId) {
            setError("Missing Razorpay order ID");
            return;
        }

        const fetchTransaction = async () => {
            const url = `${OrderDetails}?order_id=${razorpayOrderId}`;
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: auth_key,
                    },
                });

                const responseData = await res.json().catch(() => {
                    return {};
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch transaction: ${res.status} ${responseData?.message || ""}`);
                }

                if (responseData.status === "success" && Array.isArray(responseData.msg) && responseData.msg.length > 0) {
                    setTransaction(responseData.msg[0]);
                } else {
                    setError("No transaction record found.");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        const timer = setTimeout(fetchTransaction, 2000);
        return () => clearTimeout(timer);
    }, [razorpayOrderId]);

    const handleBack = () => {
        navigate("/fees");
    };

    if (error) return <div>Error: {error}</div>;
    if (!transaction) return <div>Loading transaction details...</div>;

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
            <div className="p-5 rounded shadow" style={{fontFamily:'Poppins, sans-serif'}}>
                <h2 className="fw-bold" style={{fontSize: '1rem'}}>Payment Successful</h2>
                <p><strong>Razorpay Order ID:</strong> {transaction?.razorpay_order_id}</p>
                <p><strong>Razorpay Payment ID:</strong> {transaction?.razorpay_payment_id}</p>
                <p><strong>Amount Paid:</strong> ₹{transaction?.fee_amount}</p>
            </div>

        </>
    )
}