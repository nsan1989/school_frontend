import { Container } from "react-bootstrap";
import RulesContent from "../components/RulesContent";

import "../styles/Common.css";

export default function RulesAndRegulations() {
  return (
    <>
      <div className="rulesHeader" >
        <div className="rulesTitle">
          <span className="display-4 mt-auto" style={{ fontWeight: "bold" }}>
            RULES & REGULATIONS
          </span>
        </div>
      </div>
      <div className="rulesContent py-5">
        <Container>
          <RulesContent />
        </Container>
      </div>
    </>
  );
}
