import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function AlumniContent() {
  const [alumni, setAlumni] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_ALUMNI_API_URL;
  const baseUrl = import.meta.env.VITE_ALUMNI_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new error("Failed to fetch data.");
        }
        const data = await response.json();
        setAlumni(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="testimonialCarousel">
        <Row className="d-flex justify-content-center">
          {Array.isArray(alumni) && alumni.length > 0 ? (
            alumni.map((alumnis, index) => (
              <Col md={3} key={index}>
                <div className="d-flex justify-content-center">
                  <Card
                    className="alumniCard h-100 shadow-lg p-3 m-2 text-center d-flex flex-column justify-content-between"
                    style={{
                      minHeight: "300px",
                      backgroundColor: "#FFFFFF",
                      width: "18rem",
                      color: "#654321"
                    }}
                  >
                    <Card.Img
                      className="alumniLogo mx-auto p-2"
                      variant="top"
                      src={`${baseUrl}${alumnis.photo}`}
                      style={{ maxWidth: "96px", height: "auto" }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontFamily: "Open Sans, sans-serif",
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        <b>{alumnis.name}</b>
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                        }}
                      >
                        {alumnis.current_occupation}
                      </Card.Text>
                      <Card.Text
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                        }}
                      >
                        {alumnis.body}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center">Content will be updated soon.</p>
          )}
        </Row>
      </div>
    </>
  );
}
