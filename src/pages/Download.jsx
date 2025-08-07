import { Container } from "react-bootstrap";
import Title from "../hooks/Title";
import DownloadContent from "../components/DownloadContent";

import "../styles/Common.css";

export default function Download() {
  Title("Download");
  return (
    <>
      <div className="downloadHeader">
        <div className="downloadTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">DOWNLOAD</h1>
        </div>
      </div>
      <Container>
        <div className="downloadContent py-5">
          <DownloadContent />
        </div>
      </Container>
    </>
  );
}
