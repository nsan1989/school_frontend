import { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import useSchoolInfo from "../hooks/SchoolInfo";
import styles from "../styles/aboutDetail.module.css";
import about_image from "../assets/about_image.jpg";

export default function AboutDetail() {
  const [aboutSchool, setAboutSchool] = useState([]);
  const { schoolInfo, error } = useSchoolInfo();

  const apiUrl = import.meta.env.VITE_ABOUT_API_URL;
  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;

  const removeInlineStyles = (htmlString) => {
    if (typeof htmlString !== "string") return "";
    return htmlString.replace(/ style="[^"]*"/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        const rawHtml = data.msg[0]?.body || "";
        const cleanHtml = removeInlineStyles(rawHtml);
        setAboutSchool(cleanHtml);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <div>
        <Row className="py-3 d-flex justify-content-center mb-3">
          <Col xs={12} sm={12} md={8} lg={8} xl={8} className="d-flex justify-content-center">
            <div className="aboutImage">
              {schoolInfo?.Image && (
                <Image
                  className="img-fluid"
                  src={about_image}
                  alt={schoolInfo.school_name}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: aboutSchool }} />
          </Col>
        </Row>
      </div>
    </>
  );
}
