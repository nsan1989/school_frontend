import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import Event from "../components/Event";

import "../styles/Common.css";

export default function Gallery() {
  Title("Gallery");
  return (
    <>
      <div className="galleryHeader" >
        <div className="galleryTitle">
          <span className="display-3 mt-auto" style={{fontWeight:"bold"}}>GALLERY</span>
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
