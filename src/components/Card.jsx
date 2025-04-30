import { useState, useEffect } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";

export default function SchoolCard() {
  const [mission, setMission] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_MISSION_API_URL;
  const baseUrl = import.meta.env.VITE_MISSION_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setMission(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        {error && <p>{error}</p>}
        {Array.isArray(mission) && mission.length > 0 ? (
          mission.map((missions, index) => (
            <Col className="m-2" md={4} key={index}>
              <Card
                className="h-100 text-center d-flex justify-content-center align-items-center"
                style={{
                  minHeight: "200px",
                  backgroundColor: "#fff",
                  color:"#654321"
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center w-100">
                  <Image
                    className="img-fluid rounded"
                    src={`${baseUrl}${missions.image}`}
                    style={{ width: "96px" }}
                  />
                  <Card.Title className="py-2" style={{color:"#008000", fontWeight:"bold"}}>{missions.title}</Card.Title>
                  <Card.Text>{missions.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Content will be updated soon.</p>
        )}
      </Row>
    </>
  );
}
