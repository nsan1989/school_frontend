import { useState, useEffect } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";

import { FaRegUserCircle } from "react-icons/fa";

export default function StaffInfo() {
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
        console.log(data);
        setStaff(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <Row className="mb-3">
      <Col><h3 style={{color:"#004d00", fontWeight:"bold"}}>Meet The Team</h3></Col>
    </Row>
      {error && <p>{error}</p>}
      {Array.isArray(staff) && staff.length > 0 ? (
        staff.map((staffs, index) => (
          <div className="staffContent" key={index}>
            <Card
              className="shadow-lg"
              style={{
                width: "18rem",
                color: "#3D2B1F",
              }}
            >
              <Card.Body>
                <div className="cardImage">
                  {imageError ? (
                    <FaRegUserCircle size={120} />
                  ) : (
                    <Image
                      className="img-fluid"
                      src={`${baseUrl}${staffs.staff_photo}`}
                      alt="Teacher"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                <Card.Title className="py-2">{staffs.staff_name}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p>Content will be updated soon.</p>
      )}
    </>
  );
}
