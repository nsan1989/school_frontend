import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Banner from "../components/Carousel";
import SchoolCard from "../components/Card";
import Feature from "../components/Feature";
import parse from "html-react-parser";
import Title from "../hooks/Title";
import { Link } from "react-router-dom";
import FadeInSection from "../hooks/FadeInSection";
import SlideUp from "../hooks/SlideUp";

import "../styles/Home.module.css";
import { FaRegUserCircle } from "react-icons/fa";

export default function Home() {
  Title("Home");
  const [adminMessage, setAdminMessage] = useState([]);
  const [error, setError] = useState(null);
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
      <Banner />
      <div className="cardWrapper py-5">
        <Container>
          <SlideUp>
            <SchoolCard />
          </SlideUp>
        </Container>
      </div>
      <Container fluid className="d-none d-md-flex">
        <SlideUp>
          <div className="messageWrapper">
            {error && <p>{error}</p>}
            {adminMessage
              .filter((message) => message.id === 4)
              .map((message) => (
                <Row>
                  <Col
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                    className="d-flex justify-content-center align-items-center p-0"
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
                    className="d-flex justify-content-center align-items-center"
                    style={{backgroundColor:"#004D00"}}
                  >
                    <div className="principalMessage p-3 text-light" style={{fontFamily: "Poppins sans-serif", fontSize:"0.9rem"}}>
                      {parse(
                        message.message_info
                          .split(" ")
                          .slice(0, 200)
                          .join(" ") + "..."
                      )}
                      &nbsp;
                      <Link to="/principal_message" className="text-warning" style={{textDecoration:"none"}}>
                        Read More
                      </Link>
                    </div>
                  </Col>
                </Row>
              ))}
          </div>
        </SlideUp>
      </Container>
      <Container className="d-md-none">
        <div className="messageWrapper py-5">
          {error && <p>{error}</p>}
          {adminMessage
            .filter((message) => message.id === 3)
            .map((message) => (
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  className="d-flex justify-content-center align-items-center p-2"
                >
                  <div className="adminPhoto p-2">
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
                  <div className="principalMessage p-2">
                    {parse(
                      message.message_info.split(" ").slice(0, 50).join(" ") +
                        "..."
                    )}
                    <Link to="/principal_message" className="text-primary">
                      Read More
                    </Link>
                  </div>
                </Col>
              </Row>
            ))}
        </div>
      </Container>
      <div className="featureWrapper flex-wrap align-content-center">
        <div 
        className="featureContainer py-5"
        style={{ backgroundColor: "#fff" }}
        >
          <Container>
            <FadeInSection>
              <Feature />
            </FadeInSection>
          </Container>
        </div>
      </div>
      <div className="achieveWrapper">
        <Container>

        </Container>
      </div>
    </>
  );
}
