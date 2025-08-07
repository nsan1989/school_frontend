import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import SlideUp from "../hooks/SlideUp";
import Message from "../components/Message";

import "../styles/Common.css";

export default function PrincipalMessage() {
  Title("Principal");

  return (
    <>
      <div className="principalHeader">
        <div className="principalTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">MESSAGE</h1>
        </div>
      </div>
      <Container>
        <div className="principalMessage py-5">
          <SlideUp>
            <Message />
          </SlideUp>
        </div>
      </Container>
    </>
  );
}
