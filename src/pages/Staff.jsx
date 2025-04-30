import { Container } from "react-bootstrap";
import StaffInfo from "../components/StaffInfo";
import SlideUp from "../hooks/SlideUp";

export default function Staff() {
  return (
    <>
      <div className="staffHeader" >
        <div className="staffTitle">
          <span className="display-4 mt-auto" style={{ fontWeight: "bold" }}>
            STAFF
          </span>
        </div>
      </div>
      <div className="staffContent py-5">
        <Container>
          <SlideUp>
            <StaffInfo />
          </SlideUp>
        </Container>
      </div>
    </>
  );
}
