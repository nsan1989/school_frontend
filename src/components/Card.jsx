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
      <Row className="justify-content-evenly">
        {error && <p>{error}</p>}
        {Array.isArray(mission) && mission.length > 0 ? (
          mission.map((missions, index) => (
            <Col className="m-2 d-flex" md={4} key={index}>
              <Image
                className="img-fluid rounded"
                src={`${baseUrl}${missions.image}`}
                style={{ width: "96px" }}
              />
              <div className="ms-3" style={{ alignContent: "start" }}>
                <Card.Title style={{color:"#ffcc00", fontWeight:"bold", fontSize:"1rem"}}>
                  {missions.title}
                </Card.Title>
                <Card.Text style={{color:"#004d00", fontSize:"0.9rem"}}>{missions.content}</Card.Text>
              </div>
            </Col>
          ))
        ) : (
          <p>Content will be updated soon.</p>
        )}
      </Row>
    </>
  );
}
