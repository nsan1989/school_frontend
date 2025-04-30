import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function Feature() {
  const [feature, setFeature] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_FEATURE_API_URL;
  const baseUrl = import.meta.env.VITE_FEATURE_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setFeature(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="fetureTitle d-flex justify-content-center align-items-center mb-3">
        <hr className="customHr2" />
        &nbsp;<h2 style={{
          fontFamily: "Open Sans, sans-serif",
          color:"#FFFFFF",
          fontSize:"2rem",
          fontWeight:"bold",
          }}>FEATURES</h2>&nbsp;
        <hr className="customHr2" />
      </div>
      <Row className="justify-content-center">
        {error && <p className="text-danger">{error}</p>}
        {Array.isArray(feature) && feature.length > 0 ? (
          feature.map((features, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="p-2">
              <Card
                className="featureCard h-100 p-3 text-center text-light d-flex flex-column justify-content-evenly"
                style={{
                  minHeight: "300px",
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <Card.Img
                  className="featureLogo mx-auto p-2"
                  variant="top"
                  src={`${baseUrl}${features.icon}`}
                  style={{ maxWidth: "96px", height: "auto" }}
                />
                <Card.Body>
                  <Card.Title style={{fontFamily:"Open Sans, sans-serif", fontSize:"1rem", color:"#008000", fontWeight:"bold"}}>
                    {features.title}
                  </Card.Title>
                  <Card.Text style={{fontFamily:"Poppins, sans-serif", fontSize:"0.8rem", color:"#654321"}}>{features.content}</Card.Text>
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
