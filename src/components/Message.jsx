import { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import parse from "html-react-parser";

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
  if (error) return <p>{error}</p>;
  if (!Array.isArray(message) || message.length === 0)
    return <p>Message is not available!</p>;

  const renderMessage = (id) => {
    const filteredMessages = message.filter((msg) => msg.id === id);
    if (filteredMessages.length === 0) return null;

    return filteredMessages.map((msg, index) => (
      <Row className="py-4 my-4 rounded text-dark" key={index}>
        <Col md={6}>
          <Image
            className="img-fluid rounded"
            src={`${baseUrl}${msg.photo}`}
            style={{ maxWidth: "100%", height: "auto" }}
            alt="Message visual"
          />
        </Col>
        <Col md={6} className="p-3">
          <div className="founderMessage text-dark fw-bold">
            {parse(msg.message_info)}
          </div>
        </Col>
      </Row>
    ));
  };
  return (
    <>
      {renderMessage(4)}
      {renderMessage(5, true)}
      {renderMessage(6)}
    </>
  );
}
