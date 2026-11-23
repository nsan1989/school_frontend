import { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import useSchoolInfo from "../hooks/SchoolInfo";
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
      {error && <p className="about-load-error">{error}</p>}
      <div className="about-detail">
        <Row className="py-3 d-flex justify-content-center mb-3">
          <Col xs={12} md={10} lg={9} className="d-flex justify-content-center">
            <div className="about-image-frame">
              {schoolInfo?.Image && (
                <Image
                  className="about-school-image img-fluid"
                  src={about_image}
                  alt={schoolInfo.school_name}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={10} className="mx-auto">
            <div
              className="about-description"
              dangerouslySetInnerHTML={{ __html: aboutSchool }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
