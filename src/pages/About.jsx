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
          <h1 className="display-5 mt-auto py-3 fw-bold">ABOUT US</h1>
        </div>
      </div>
      <div className="aboutContent py-5">
      <Container>
          <SlideUp>
            <AboutDetail />
          </SlideUp>
        </Container>
      </div>
    </>
  );
}
