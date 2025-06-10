import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSchoolInfo from "../hooks/SchoolInfo";
import logo from "../assets/download.png";

import {
  FaLocationArrow,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/Footer.module.css";

export default function Footer() {
  const { schoolInfo, error } = useSchoolInfo();
  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;
  return (
    <div className="footerWrapper py-3">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerImage  d-flex">
              {error && <p>{error}</p>}
              {schoolInfo?.school_photo && (
                <Link to="/">
                  <Image
                    className="img-fluid"
                    src={`${baseUrl}${schoolInfo.school_photo}`}
                    alt={schoolInfo.school_name}
                    style={{ width: "60px", height: "60px" }}
                  />
                </Link>
              )}
              &nbsp;
              <div className="shijaFoundation">
                <Image className="img-fluid" src={logo} style={{ width: "60px", height: "60px" }} />
              </div>
            </div>
            <div className="footerText py-2">
              <small>
                St. Anthony’s High School, established in 1983, is a
                CBSE-affiliated co-educational institution in Manipur. With a
                dedicated faculty and a nurturing environment, it prepares
                students for independent and successful futures.
              </small>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerTitle">
              <h4>External Links</h4>
            </div>
            <div className="footerLinks py-2">
              <small>
                <Link
                  className="footerLink d-block pb-2"
                  to="https://www.bsem.nic.in/"
                  target="_blank"
                >
                  BOSEM
                </Link>
              </small>
              <small>
                <Link
                  className="footerLink d-block pb-2"
                  to="https://cohsem.nic.in/"
                  target="_blank"
                >
                  COHSEM
                </Link>
              </small>
              <small>
                <Link
                  className="footerLink d-block pb-2"
                  to="https://www.cbse.gov.in/cbsenew/cbse.html"
                  target="_blank"
                >
                  CBSE
                </Link>
              </small>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerTitle">
              <h4>Quick Links</h4>
            </div>
            <div className="footerLinks py-2">
              <small>
                <Link className="footerLink d-block pb-2" to="/gallery">
                  Gallery
                </Link>
                <Link className="footerLink d-block pb-2" to="/notification">
                  Notice
                </Link>
                <Link className="footerLink d-block pb-2" to="/download">
                  Downloads
                </Link>
                <Link
                  className="footerLink d-block pb-2"
                  to="/rules&regulations"
                >
                  Rules & Regulations
                </Link>
                <Link
                  className="footerLink d-block pb-2"
                  to="/terms&conditions"
                >
                  Terms & Conditions
                </Link>
              </small>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerTitle">
              <h4>Contact Info</h4>
            </div>
            <div className="footerContent d-flex pb-2">
              <div className="footerIcon">
                <FaLocationArrow size={16} className="me-3" />
              </div>
              <div className="footerText">
                {error && <p>{error}</p>}
                {schoolInfo?.school_address && (
                  <small>{schoolInfo.school_address}.</small>
                )}
              </div>
            </div>
            <div className="footerContent d-flex pb-2">
              <div className="footerIcon">
                <FaPhoneAlt size={16} className="me-3" />
              </div>
              <div className="footerText">
                {error && <p>{error}</p>}
                {schoolInfo?.school_phone && (
                  <small>{schoolInfo.school_phone}.</small>
                )}
              </div>
            </div>
            <div className="footerContent d-flex pb-2">
              <div className="footerIcon">
                <FaEnvelope size={16} className="me-3" />
              </div>
              <div className="footerText">
                {error && <p>{error}</p>}
                {schoolInfo?.school_email && (
                  <small
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {schoolInfo.school_email}
                  </small>
                )}
              </div>
            </div>
            <div className="footerIcon d-flex pt-2">
              <FaFacebook size={16} className="me-3" />
              <FaInstagram size={16} className="me-3" />
              <FaWhatsapp size={16} />
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="d-flex justify-content-center flex-wrap align-items-center text-center gap-2">
            <small style={{ fontSize: "12px" }}>
              Copyright &copy; 2025 St. Anthony School, All Rights Reserved.
            </small>
            <div
              style={{
                borderLeft: "1px solid #f8f1e7",
                height: "15px",
              }}
            />
            <small style={{ fontSize: "12px" }}>
              Designed and Developed by MIS Shija Hospital.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
