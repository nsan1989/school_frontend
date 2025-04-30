import { useState, useEffect } from "react";
import parse, { domToReact } from "html-react-parser";
import { Row, Col, Image } from "react-bootstrap";
import useSchoolInfo from "../hooks/SchoolInfo";

import "../styles/AboutDetail.css";

export default function AboutDetail() {
  const [aboutSchool, setAboutSchool] = useState([]);
  const [error, setError] = useState(null);
  const { schoolInfo } = useSchoolInfo();
  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;

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
              <Row className="py-3">
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ textAlign: "justify" }}
                >
                  <div className="h4Content">
                    {elements.h4.map((content, i) => (
                      <h4 key={i} style={{
                        fontFamily:"Poppins, sans-serif",
                        color:"#654321",
                        fontSize: "1rem"
                      }}>{content}</h4>
                    ))}
                  </div>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  className="d-flex justify-content-center"
                >
                  <div className="schoolLogo">
                    {error && <p>{error}</p>}
                    {schoolInfo?.Image && (
                      <Image
                        className="img-fluid"
                        src={`${baseUrl}${schoolInfo.Image}`}
                        alt={schoolInfo.school_name}
                      />
                    )}
                  </div>
                </Col>
              </Row>
              <div className="h5Content">
                {elements.h5.map((content, i) => (
                  <h5 className="text-uppercase" key={i}>
                    {content}
                  </h5>
                ))}
              </div>
              &nbsp;
              <div className="ulContent">
                {elements.ul.map((content, i) => (
                  <ul key={i}>{content}</ul>
                ))}
              </div>
              <div className="pContent">
                {elements.p.map((content, i) => (
                  <p key={i}>{content}</p>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p>Content will be updated soon.</p>
      )}
    </>
  );
}
