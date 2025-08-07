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
          <h1 className="display-5 mt-auto py-3 fw-bold">APPLICATION</h1>
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
