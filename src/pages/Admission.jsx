import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Admission() {
  Title("Admission");
  const [sessionName, setSessionName] = useState("");
  return (
    <>
      <div className="aboutHeader">
        <div className="aboutTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">ADMISSION</h1>
        </div>
      </div>
      <Container className="mt-5 py-5">
        <div
          className="disclaimer-content mb-3"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "clamp(12px, 3vw, 20px)",
            border: "1px solid #e0a800",
            borderRadius: "8px",
            backgroundColor: "#fff8dc",
            color: "#212529",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: 1.6,
              textAlign: "left",
            }}
          >
            Parents are requested to submit the printed copy of the registration
            done to the school's office within 5 days from the day on which the
            online registration is made, whereas extention of day/days may be
            there equivalent to the number holidays/closures falling within the
            5 days window period.
          </p>
        </div>
        <div className="py-2 text-center">
          <p className="m-0">
            To check your application status{" "}
            <Link
              className="text-warning"
              to="/application"
              style={{ textDecoration: "none" }}
            >
              click here.
            </Link>
          </p>
        </div>
        <Row className="py-2 d-flex justify-content-center text-light py-4">
          <Col
            className="p-3 shadow-lg rounded"
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            style={{ backgroundColor: "#202060" }}
          >
            {sessionName && (
              <h3 className="text-center text-white mb-4">{sessionName}</h3>
            )}
            <Register onSessionChange={setSessionName} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
