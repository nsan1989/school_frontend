import { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";

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
      <Row className="justify-content-center">
        {error && <p className="text-danger">{error}</p>}
        {Array.isArray(feature) && feature.length > 0 ? (
          feature.map((features, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="p-2">
              <div className="featureIcon">
                <Image src={`${baseUrl}${features.icon}`} style={{ maxWidth: "56px", height: "auto" }} />
              </div>
              <div className="featureContent d-flex flex-column">
                <div className="my-3 fw-bold" style={{fontFamily: "Open Sans, sans-serif", fontSize: "1rem", color: "#008000"}}>{features.title}</div>
                <div style={{fontFamily: "Poppins, sans-serif", fontSize: "0.9rem"}}>{features.content}</div>
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center">Content will be updated soon.</p>
        )}
      </Row>
    </>
  );
}
