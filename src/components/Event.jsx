import { useState, useEffect } from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";

import { FaRegUserCircle } from "react-icons/fa";

export default function Event() {
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [images, setImages] = useState([]);

  const eventUrl = import.meta.env.VITE_EVENT_API_URL;
  const galleryUrl = import.meta.env.VITE_GALLERY_API_URL;
  const baseUrl = import.meta.env.VITE_GALLERY_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(eventUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setEvent(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const fetchGallery = async (eventId) => {
    try {
      const response = await fetch(galleryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery_id: eventId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setImages(data.msg);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Row className="d-flex justify-content-evenly">
        {error && <p>{error}</p>}
        {Array.isArray(event) && event.length > 0 ? (
          event.map((events) => (
            <Col
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              key={events.id}
              className="p-2"
            >
              <Card
                className="h-100 shadow-sm text-light"
                style={{
                  minHeight: "300px",
                  backgroundColor: "rgba(101, 67, 33, 0.9)",
                }}
              >
                <Card.Body className="text-center d-flex flex-column">
                  <div className="d-flex justify-content-center">
                    {events.title_image ? (
                      <Image
                        className="img-fluid rounded"
                        src={`${baseUrl}${events.title_image}`}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "fill",
                        }}
                      />
                    ) : (
                      <FaRegUserCircle style={{ fontSize: "200px" }} />
                    )}
                  </div>
                  <div className="cardTitle d-flex justify-content-between py-2">
                    <Card.Title>{events.title}</Card.Title>
                    <Card.Text>
                      <small>{events.date}</small>
                    </Card.Text>
                  </div>
                  <Card.Text>
                    {events.content.split("").slice(0, 30).join("") + "..."}
                  </Card.Text>
                  <div className="position-relative mt-auto">
                    <Button
                      className="w-100"
                      onClick={() => {
                        setSelectedEventId(events.id);
                        fetchGallery(events.id);
                      }}
                      style={{
                        backgroundColor: "#FFD700",
                        border: "none",
                        color: "#654321",
                      }}
                    >
                      View Photos
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No events available!</p>
        )}
      </Row>
      {selectedEventId && images.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center">Gallery Photos</h3>
          <Row className="g-4">
            {images.map((image, index) => (
              <Col className="d-flex justify-content-center align-items-center" md={3} key={index}>
                <Image
                  src={`${baseUrl}${image.photo}`}
                  alt="Photo"
                  className="img-fluid"
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}
