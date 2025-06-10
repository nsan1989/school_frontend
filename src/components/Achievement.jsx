import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";

import "../styles/Common.css";

export default function Achievement() {
  const [achieve, setAchieve] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_ACHIEVEMENT_API_URL;
  const baseUrl = import.meta.env.VITE_ACHIEVEMENT_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setAchieve(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Row className="justify-content-center">
        {error && <p className="text-danger">{error}</p>}
        {Array.isArray(achieve) && achieve.length > 0 ? (
          achieve.map((achieves, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="p-2">
              <Card
                className="achieveCard h-100 d-flex flex-column align-items-center text-center text-light p-3"
                style={{
                  minHeight: "250px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  backdropFilter: "blur(12px)",
                  webkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  padding: "1.5rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="achieveImage">
                  <Card.Img
                    src={
                      achieves.photo
                        ? `${baseUrl}${achieves.photo}`
                        : "/default-image.png"
                    }
                    alt="Achievement"
                    className="achieve-img img-fluid"
                  />
                </div>
                <Card.Body className="d-flex flex-column justify-content-center w-100">
                  <div className="featureContent pt-3" style={{fontFamily:"Poppins, sans-serif",fontSize:"0.8rem", color:"#ffffff"}}>
                    {parse(achieves.achievement_info)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Content will be updated soon.</p>
        )}
      </Row>
    </>
  );
}
