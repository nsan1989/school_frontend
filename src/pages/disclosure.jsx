import { Container } from "react-bootstrap";
import "../styles/Common.css";
import Title from "../hooks/Title";
import affiliation from "../assets/affiliation.pdf";
import society from "../assets/society.pdf";
import noc from "../assets/noc.pdf";
import building_safety from "../assets/building_safety.pdf";
import fire_safety from "../assets/fire_safety.pdf";
import transport_safety from "../assets/transport_safety.pdf";
import water_safety from "../assets/water_safety.pdf";
import ptm from "../assets/ptm.pdf";
import affidavit from "../assets/affidavit.pdf";
import result from "../assets/result.pdf";
import fees from "../assets/fees.pdf";
import planner from "../assets/planner.pdf";

export default function DisclosurePage() {
  Title("Public Disclosure");
  return (
    <>
      <div className="aboutHeader">
        <div className="aboutTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">DISCLOSURE</h1>
        </div>
      </div>
      <Container className="py-5">
        <div className="disclosure-content mb-4 text-center">
            <h3 className="fw-bold" style={{color: "#004D00"}}>List of all Certificates</h3>
        </div>
        <div className="row g-4">
        <div className="disclosureContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Affiliation Certificate</h5>
            <a href={affiliation} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="societyContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Society Certificate</h5>
            <a href={society} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="nocContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>NOC Certificate</h5>
            <a href={noc} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="buildingContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Building Safety Certificate</h5>
            <a href={building_safety} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="fireContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Fire Safety Certificate</h5>
            <a href={fire_safety} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="transportContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Transport Safety Certificate</h5>
            <a href={transport_safety} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="transportContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Water Safety Certificate</h5>
            <a href={water_safety} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="ptmContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Parent's Teacher Meeting Certificate</h5>
            <a href={ptm} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="affidavitContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Affidavit Certificate</h5>
            <a href={affidavit} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="resultContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Result Certificate</h5>
            <a href={result} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="feesContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Annual Fees</h5>
            <a href={fees} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        <div className="plannerContent col-md-6 col-lg-4">
            <h5 style={{color: "#004D00"}}>Year Planner</h5>
            <a href={planner} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
        </div>
        </div>
      </Container>
    </>
  );
}
