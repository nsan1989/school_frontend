import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function CheckApplication() {
  const [userInfo, setUserInfo] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    aadhaar: "",
  });
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_CHECK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success" && data.msg.length > 0) {
          setUserInfo(data.msg[0]);
          setMessage("Registration Successful!");
        } else {
          setUserInfo([]);
          setMessage("No records found.");
        }
        setFormData({ aadhaar: "" });
      } else {
        setMessage("Invalid aadhaar no.");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="shadow-lg p-4 rounded">
      <h4 className="mb-4 text-center" style={{color:"#003399"}}>Check your application status</h4>
      <Form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <Row className="d-flex justify-content-center">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Enter Aadhaar Number"
              className="mr-sm-2"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              required
            />
          </Col>
          <Col xs="auto">
            <Button variant="warning" type="submit">
              Check
            </Button>
          </Col>
        </Row>
      </Form>
      {message && <p className="mt-3 text-center text-info">{message}</p>}

      {userInfo !== null && Object.keys(userInfo).length > 0 && (
        <>
          <style>
            {`
              @media print {
                body * {
                  visibility: hidden;
                }
                #application-details,
                #application-details * {
                  visibility: visible;
                }
                #application-details {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  border: 0 !important;
                  background: #fff !important;
                }
              }
            `}
          </style>
          <div id="application-details" className="mt-3 p-3 border rounded bg-light">
            <h5>Application Details:</h5>
            <p>
              <strong>Form No:</strong> {userInfo["Form-No"]}
            </p>
            <p>
              <strong>Student Name:</strong> {userInfo.student_name}
            </p>
            <p>
              <strong>Aadhaar No:</strong> {userInfo.student_aadhaar_no}
            </p>
            <p>
              <strong>Gender:</strong> {userInfo.gender}
            </p>
            <p>
              <strong>Category:</strong> {userInfo["General-Category"]}
            </p>
            <p>
              <strong>Class:</strong> {userInfo.class_name}
            </p>
            <p>
              <strong>Date of Birth:</strong> {userInfo.dob}
            </p>
            <p>
              <strong>Age:</strong> {userInfo.age} years
            </p>
            <p>
              <strong>Father's Name:</strong> {userInfo.father_name}
            </p>
            <p>
              <strong>Mother's Name:</strong> {userInfo.mother_name}
            </p>
            <p>
              <strong>State:</strong> {userInfo.State}
            </p>
            <p>
              <strong>District:</strong> {userInfo.Disctrict}
            </p>
            <p>
              <strong>Permanent Address:</strong> {userInfo.permanent_address}
            </p>
            <p>
              <strong>Phone No:</strong> {userInfo.phone_no}
            </p>
          </div>
          <div className="text-center mt-3">
            <Button
              variant="warning"
              type="button"
              onClick={() => window.print()}
            >
              Print Application
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
