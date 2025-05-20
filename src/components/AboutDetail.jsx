import { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";
import { Row, Col, Container } from "react-bootstrap";

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
                <Row className="py-3 mb-3">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div className="sectionTitle">
                      <h3
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Open Sans, sans-serif",
                          fontSize: "2rem",
                          color: "#008000",
                        }}
                      >
                        St.Anthony's History
                      </h3>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={8}
                    style={{ textAlign: "justify" }}
                  >
                    <div className="h4Content">
                      {elements.h4.map((content, i) => (
                        <h4
                          key={i}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            color: "#654321",
                            fontSize: "0.9rem",
                            fontStyle: "normal",
                          }}
                        >
                          {content}
                        </h4>
                      ))}
                    </div>
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
