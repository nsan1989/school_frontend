import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSchoolInfo from "../hooks/SchoolInfo";

import {
  FaLocationArrow,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  const { schoolInfo, error } = useSchoolInfo();
  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;
  return (
    <div className="footerWrapper py-3">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerImage">
              {error && <p>{error}</p>}
              {schoolInfo?.school_photo && (
                <Image
                  className="img-fluid"
                  src={`${baseUrl}${schoolInfo.school_photo}`}
                  alt={schoolInfo.school_name}
                  style={{ width: "60px", height: "60px" }}
                />
              )}
            </div>
            <div className="footerText py-2">
              <small>
                Concept Higher Secondary fosters scientific curiosity and
                excellence, providing quality education per NEP 2020.
              </small>&nbsp;
              <Link className="footerLink" to="/about_school">
                <small className="text-warning">Read More</small>
              </Link>
            </div>
            <div className="others">
                <h5 className="mb-0">Apply Here</h5>
              <div className="footerLinks d-flex py-2">
                <small>
                  <Link className="footerLink d-block pb-2" to="https://www.bsem.nic.in/" target="_blank">
                    BOSEM
                  </Link>
                </small>
                <small>
                  <Link className="footerLink d-block ps-3 pb-2" to="https://www.cohsem.nic.in/" target="_blank">
                    COHSEM
                  </Link>
                </small>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerTitle">
              <h4 className="mb-0">Site Map</h4>
            </div>
            <div className="footerLinks py-2">
              <small>
                <Link className="footerLink d-block pb-2" to="/notification">
                  Notice
                </Link>
              </small>
              <small>
                <Link className="footerLink d-block pb-2" to="/gallery">
                  Gallery
                </Link>
              </small>
              <small>
                <Link className="footerLink d-block pb-2" to="/download">
                  Downloads
                </Link>
              </small>
              <small>
                <Link className="footerLink d-block pb-2" to="/contact">
                  Contact
                </Link>
              </small>
            </div>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <div className="footerTitle">
              <h4 className="mb-0">Quick Links</h4>
            </div>
            <div className="footerLinks py-2">
              <small>
                <Link className="footerLink d-block pb-2" to="/privacy&policy">
                  Privacy & Policy
                </Link>
                <Link className="footerLink d-block pb-2" to="/refundpolicy">
                  Refund Policy
                </Link>
                <Link className="footerLink d-block pb-2" to="/pricingpolicy">
                  Pricing Policy
                </Link>
                <Link className="footerLink d-block pb-2" to="/shipping&delivery">
                  Shipping & Delivery
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
          <Col
            xs={12}
            sm={12}
            md={3}
            lg={3}
            xl={3}
            style={{ flexWrap: "wrap" }}
          >
            <div className="footerTitle">
              <h4 className="mb-0">Contact Info</h4>
            </div>
            <div className="footerContent d-flex pb-2">
              <div className="footerIcon">
                <FaLocationArrow className="me-3 text-warning" />
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
                <FaPhoneAlt className="me-3 text-warning" />
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
                <FaEnvelope className="me-3 text-warning" />
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
            <div className="footerIcons d-flex pt-2">
              <FaFacebook className="me-3 text-warning" />
              <FaInstagram className="me-3 text-warning" />
              <FaWhatsapp className="text-warning" />
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="flex-wrap align-content-center text-center">
            <small>
              &copy; 2025 Concept School, All Right Reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
