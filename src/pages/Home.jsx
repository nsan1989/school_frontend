import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../components/Carousel";
import SchoolCard from "../components/Card";
import Feature from "../components/Feature";
import Notice from "../components/Notice";
import Achievement from "../components/Achievement";
import parse from "html-react-parser";
import Title from "../hooks/Title";
import FadeInSection from "../hooks/FadeInSection";
import SlideUp from "../hooks/SlideUp";

import "../styles/Home.css";
import { FaRegUserCircle } from "react-icons/fa";

export default function Home() {
  Title("Home");
  const [adminMessage, setAdminMessage] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const apiUrl = import.meta.env.VITE_ADMIN_API_URL;
  const baseUrl = import.meta.env.VITE_ADMIN_BASE_URL;
  const alumniUrl = import.meta.env.VITE_ALUMNI_API_URL;
  const alumniBaseUrl = import.meta.env.VITE_ALUMNI_BASE_URL;

  {
    /* Fetching Admin API data */
  }
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

  {
    /* Fetching Alumni API data */
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(alumniUrl);
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

  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  return (
    <>
      <Banner />
      <div className="cardWrapper py-5" style={{ backgroundColor: "#f8f1e7" }}>
        <Container>
          <SlideUp>
            <SchoolCard />
          </SlideUp>
        </Container>
      </div>
      <Container>
        <FadeInSection>
          <div className="messageWrapper py-5">
            {error && <p>{error}</p>}
            {adminMessage
              .filter((message) => message.id === 2)
              .map((message, index) => (
                <Row key={index}>
                  <Col
                    md={4}
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
                          loading="lazy"
                          onError={() => setImageError(true)}
                        />
                      )}
                    </div>
                  </Col>
                  <Col
                    md={8}
                    className="d-flex justify-content-center align-items-center p-2"
                  >
                    <div className="principalMessage p-2">
                      {parse(
                        message.message_info
                          .split(" ")
                          .slice(0, 120)
                          .join(" ") + "..."
                      )}
                      <Link
                        to="/principal_message"
                        className="text-primary"
                        style={{ textDecoration: "none" }}
                      >
                        Read More
                      </Link>
                    </div>
                  </Col>
                </Row>
              ))}
          </div>
        </FadeInSection>
      </Container>
      <div className="featureWrapper flex-wrap align-content-center">
        <div className="featureContainer border py-5">
          <Container>
            <FadeInSection>
              <Feature />
            </FadeInSection>
          </Container>
        </div>
      </div>
      <div className="noticeWrapper">
        <Container>
          <Row className="py-5 d-flex justify-content-center">
            {/* Notice Section */}
            <Col xs={12} md={6}>
              <div className="contentBox noticeBox">
                <div className="sectionHeader">
                  <h3>NOTICE</h3>
                  <Link to="/notification">View All</Link>
                </div>
                <hr />
                <div className="noticeContent">
                  <Notice />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="achieveWrapper flex-wrap align-content-center">
        <div className="achieveContainer py-5">
          <Container>
            <FadeInSection>
              <Achievement />
            </FadeInSection>
          </Container>
        </div>
      </div>
      <div className="testimonialWrapper py-5">
        <Container>
          <div className="testimonialTitle d-flex justify-content-center align-items-center mb-3">
            <hr className="customHr" />
            &nbsp;
            <h2
              style={{
                fontFamily: "Open Sans, sans-serif",
                color: "#654321",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              TESTIMONIALS
            </h2>
            &nbsp;
            <hr className="customHr" />
          </div>
          {Array.isArray(alumni) && alumni.length > 0 ? (
            <Carousel
              indicators={false}
              controls={false}
              interval={3000}
              pause="hover"
            >
              {chunkArray(alumni, 1).map((alumniGroup, index) => (
                <Carousel.Item key={index} className="text-center">
                  <Row className="justify-content-center">
                    {alumniGroup.map((alumnis, idx) => (
                      <Col
                        key={idx}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="d-flex justify-content-center"
                      >
                        <Card
                          className="alumniCard h-100 p-3 rounded text-center text-light d-flex flex-column justify-content-between"
                          style={{
                            minHeight: "300px",
                            backgroundColor: "#FFFFFF",
                            width: "100%",
                            maxWidth: "18rem",
                          }}
                        >
                          <Card.Img
                            className="alumniLogo mx-auto p-2"
                            variant="top"
                            src={`${alumniBaseUrl}${alumnis.photo}`}
                            alt={`${alumnis.name}'s photo`}
                            style={{ maxWidth: "96px", height: "auto" }}
                          />
                          <Card.Body style={{ color: "#654321" }}>
                            <Card.Title
                              style={{
                                fontFamily: "Open Sans, sans-serif",
                                fontSize: "1rem",
                                fontWeight: "bold",
                              }}
                            >
                              {alumnis.name}
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
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p className="text-center">Alumni content is not available!</p>
          )}
        </Container>
      </div>
    </>
  );
}
