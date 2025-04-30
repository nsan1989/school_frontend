import { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";

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
        setStaff(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {error && <p>{error}</p>}
      {Array.isArray(staff) && staff.length > 0 ? (
        staff.map((staffs, index) => (
          <div className="staffContent" key={index}>
            <Card
              className="p-2"
              style={{
                width: "18rem",
                backgroundColor: "#E6D5C3",
                color: "#3D2B1F",
              }}
            >
              <Card.Body className="text-center">
                <div className="cardImage text-center">
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
