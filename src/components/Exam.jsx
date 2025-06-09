import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

export default function ExamInfo() {
    const [examInfo, setExamInfo] = useState([]);
    const [error, setError] = useState(null);

    const examApiUrl = import.meta.env.VITE_EXAM_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            const auth_key = localStorage.getItem("auth_key");
            const id = parseInt(localStorage.getItem("student_id"));
            if (isNaN(id)) {
                setError("Invalid student ID");
                return;
            }

            try {
                const response = await fetch(examApiUrl, {
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
                setExamInfo(data.msg);
            } catch(error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <div className="exam-title">
                        <h5>Examination</h5>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                
                </Col>
            </Row>
        </>
    )
}