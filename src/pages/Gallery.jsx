import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import Event from "../components/Event";

import "../styles/Common.css";

export default function Gallery() {
  Title("Gallery");
  return (
    <>
      <div className="galleryHeader">
        <div className="galleryTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">GALLERY</h1>
        </div>
      </div>
      <div className="aboutContent py-5">
        <Container>
          <Event />
        </Container>
      </div>
    </>
  );
}
