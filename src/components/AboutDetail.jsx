import { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";
import { Row, Col, Container, Image } from "react-bootstrap";
import image from "../assets/background_new2.jpg";
import SchoolCard from "./Card";

export default function AboutDetail() {
  const [aboutSchool, setAboutSchool] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_ABOUT_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();

        setAboutSchool(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {Array.isArray(aboutSchool) && aboutSchool.length > 0 ? (
        aboutSchool.map((about, index) => {
          const elements = {
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            p: [],
            ul: [],
            div: [],
          };
          parse(about.body, {
            replace: (domNode) => {
              if (domNode.name && elements.hasOwnProperty(domNode.name)) {
                elements[domNode.name].push(domToReact(domNode.children));
                return <></>;
              }
            },
          });
          return (
            <div key={index}>
              <Container>
                <Row className="mb-3">
                  <Col className="d-flex flex-column">
                    <div className="sectionTitle text-center">
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Open Sans, sans-serif",
                          fontSize: "2rem",
                          color: "#004d00",
                        }}
                      >
                        Welcome to St.Anthony's School
                      </h3>
                      <small style={{color:"#ffcc00"}}>Inspiring Minds&nbsp;|&nbsp;Bulding Futures</small>
                    </div>
                  </Col>
                </Row>
                <Row className="py-5 mb-3 g-3">
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <Image className="img-fluid rounded" src={image} />
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    className="d-flex align-items-center"
                  >
                    <div className="h4Content">
                      {elements.h4.map((content, i) => (
                        <h4
                          key={i}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            color: "#004d00",
                            fontSize: "0.9rem",
                            fontStyle: "normal",
                            textAlign: "justify"
                          }}
                        >
                          {content}
                        </h4>
                      ))}
                    </div>
                  </Col>
                </Row>
                <Row className="py-5">
                  <Col>
                      <SchoolCard />
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })
      ) : (
        <p className="h-100">Content will be updated soon.</p>
      )}
    </>
  );
}
