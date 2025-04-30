import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function Message() {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
  const baseUrl = import.meta.env.VITE_ADMIN_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setMessage(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Row>
      {error && <p>{error}</p>}
      {Array.isArray(message) && message.length > 0 ? (
        message.map((messages, index) => (
          <Col key={index}>
            <Card>
              <Card.Img variant="top" src={`${baseUrl}${messages.photo}`} />
              <Card.Text>{messages.message_info}</Card.Text>
            </Card>
          </Col>
        ))
      ) : (
        <p>Content will be updated soon.</p>
      )}
    </Row>
  );
}
