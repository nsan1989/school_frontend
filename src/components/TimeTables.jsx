import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Title from "../hooks/Title";

export default function TimesTables() {
  const [error, setError] = useState(null);
  const [timeTable, setTimeTable] = useState([]);

  const timeTableUrl = import.meta.env.VITE_TIME_TABLE_API_URL;

  useEffect(() => {
    const fetchTimeTable = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(timeTableUrl, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        setTimeTable(data.msg || []);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTimeTable();
  }, []);

  Title("Time Table");

  const today = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "Asia/Kolkata",
    })
    .toUpperCase();

  const periodOrder = [
    "1ST PERIOD",
    "2ND PERIOD",
    "3RD PERIOD",
    "4TH PERIOD",
    "5TH PERIOD",
    "6TH PERIOD",
    "7TH PERIOD",
    "8TH PERIOD",
  ];

  const todayTimeTable = timeTable
    .filter((item) => item.day_name === today)
    .sort(
      (a, b) =>
        periodOrder.indexOf(a.class_timing_name) -
        periodOrder.indexOf(b.class_timing_name)
    );

  return (
    <>
      <Row>
        <Col>
          <h5 className="mb-4 fw-bold" style={{color:"#004d00"}}>Today's Time Table - {today}</h5>
        </Col>
      </Row>
      <Row className="g-2">
        {todayTimeTable.length === 0 ? (
          <div>No classes scheduled for today.</div>
        ) : (
          todayTimeTable.map((period) => (
            <Col xs={12} sm={12} md={3} lg={3} xl={3} key={period.id}>
              <Card
                className="mb-2 h-100 shadow-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(12px)",
                  webkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Card.Body className="d-flex flex-column" style={{color:"#004d00"}}>
                  <strong>{period.class_timing_name}:&nbsp;</strong>
                  <span>Subject - {period.subject_name}</span>
                  <span>Teacher - {period.emp_name}</span>
                  <span>Section - {period.section_name}</span>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
