import { Container } from "react-bootstrap";
import CheckApplication from "../components/AppliclationCheck";
import Title from "../hooks/Title";
import SlideUp from "../hooks/SlideUp";

export default function Application() {
    Title("Application")
  return (
    <>
      <div className="applicationHeader">
        <div className="applicationTitle">
          <span className="display-4 mt-auto py-3" style={{fontWeight:"bold"}}>APPLICATION</span>
        </div>
      </div>
      <div className="applicationContent py-5">
        <Container>
          <SlideUp>
            <CheckApplication />
          </SlideUp>
        </Container>
      </div>
    </>
  );
}
