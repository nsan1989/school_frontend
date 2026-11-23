import { useState, useEffect } from "react";
import { Image, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import Title from "../hooks/Title";
import "../styles/Common.css";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const apiUrl = import.meta.env.VITE_STAFF_API_URL;
  const baseUrl = import.meta.env.VITE_STAFF_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setStaff(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  Title("Staff");

  return (
    <>
      <div className="staffHeader">
        <div className="staffTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">STAFF</h1>
        </div>
      </div>
      <div className="staffContent py-5">
      <div className="staff-heading text-center mb-5">
        <h3 className="fw-bold" style={{ color: "#004D00" }}>
          List of all staff
        </h3>
      </div>
      <Container>
        {error && <p className="text-danger text-center">{error}</p>}
        {Array.isArray(staff) && staff.length > 0 ? (
          <Row className="g-4 justify-content-center">
            {staff.map((staffs, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className="staff-card h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <div className="staff-card-image">
                      {imageError ? (
                        <FaRegUserCircle size={112} />
                      ) : (
                        <Image
                          className="staff-photo"
                          src={`${baseUrl}${staffs.staff_photo}`}
                          alt={staffs.staff_name || "School staff member"}
                          onError={() => setImageError(true)}
                        />
                      )}
                    </div>
                    <Card.Title className="staff-card-name mt-3 mb-0">
                      {staffs.staff_name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">Staff is not available!</p>
        )}
      </Container>
      </div>
    </>
  );
}
