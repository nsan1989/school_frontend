import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import parse from "html-react-parser";
import Title from "../hooks/Title";
import SlideUp from "../hooks/SlideUp";

import "../styles/Common.css";
import { FaRegUserCircle } from "react-icons/fa";

export default function PrincipalMessage() {
  Title("Principal");
  const [adminMessage, setAdminMessage] = useState([]);
  const [imageError, setImageError] = useState(false);
  const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
  const baseUrl = import.meta.env.VITE_ADMIN_BASE_URL;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch message.");
        }
        const data = await response.json();
        setAdminMessage(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchAdmin();
  }, []);
  return (
    <>
      <div className="principalHeader" >
        <div className="principalTitle">
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>MESSAGE</span>
        </div>
      </div>
      <div className="principalContent py-5">
        <Container>
          <SlideUp>
            {adminMessage
              .filter((message) => message.id === 2)
              .map((message, index) => (
                <Row key={index}>
                  <Col
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                    className="d-flex justify-content-center p-3"
                  >
                    <div className="adminPhoto">
                      {imageError ? (
                        <FaRegUserCircle size={120} />
                      ) : (
                        <Image
                          className="img-fluid"
                          src={`${baseUrl}${message.photo}`}
                          alt="Admin"
                          onError={() => setImageError(true)}
                        />
                      )}
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={8}
                    className="d-flex justify-content-center align-items-center p-2"
                  >
                    <div className="principalMessage">
                      {parse(message.message_info)}
                    </div>
                  </Col>
                </Row>
              ))}
          </SlideUp>
        </Container>
      </div>
    </>
  );
}
