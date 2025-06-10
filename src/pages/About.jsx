import { Container } from "react-bootstrap";
import AboutDetail from "../components/AboutDetail";
import "../styles/Common.css";
import Title from "../hooks/Title";
import SlideUp from "../hooks/SlideUp";

export default function About() {
  Title("About");
  return (
    <>
      <div className="aboutHeader">
        <div className="aboutTitle">
          <span className="display-4 mt-auto" style={{ fontWeight: "bold" }}>
            ABOUT SCHOOL
          </span>
        </div>
      </div>
      <div className="aboutContent pt-5">
        <Container>
          <SlideUp>
            <AboutDetail />
          </SlideUp>
        </Container>
      </div>
    </>
  );
}
