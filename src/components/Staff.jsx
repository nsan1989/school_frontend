import { useState, useEffect } from "react";
import { Image, Card, Container } from "react-bootstrap";
import Title from "../hooks/Title";

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
      <div
        className="staffContent py-5"
      >
        <div className="content-title text-center mb-5">
          <h3 className="fw-bold" style={{color: "#004D00"}}>List of all staff</h3>
        </div>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {error && <p>{error}</p>}
          {Array.isArray(staff) && staff.length > 0 ? (
            staff.map((staffs, index) => (
              <div key={index} style={{ width: "18rem", height: "22rem" }}>
                <Card
                  className="p-2"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#E6D5C3",
                    color: "#FFF",
                  }}
                >
                  <Card.Body
                    className="text-center"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      className="cardImage text-center"
                      style={{
                        height: "180px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {imageError ? (
                        <FaRegUserCircle size={120} />
                      ) : (
                        <Image
                          className="img-fluid"
                          style={{ height: "160px", objectFit: "contain" }}
                          src={`${baseUrl}${staffs.staff_photo}`}
                          alt="Teacher"
                          onError={() => setImageError(true)}
                        />
                      )}
                    </div>
                    <Card.Title className="py-2">
                      {staffs.staff_name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>Staff is not available!</p>
          )}
        </Container>
      </div>
    </>
  );
}
