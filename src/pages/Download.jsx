import { Container, Image } from "react-bootstrap";
import Title from "../hooks/Title";
import useSchoolInfo from "../hooks/SchoolInfo";

import "../styles/Common.css";

export default function Download() {
  Title("Download");
  const { schoolInfo, error } = useSchoolInfo();
  const infoBaseUrl = import.meta.env.VITE_INFO_BASE_URL;
  return (
    <>
      <div className="downloadHeader">
        <div className="downloadTitle">
          <span className="display-3 mt-auto" style={{ fontWeight: "bold" }}>
            DOWNLOAD
          </span>
        </div>
      </div>
      <div className="downloadContent py-5">
        <Container>
          <div className="schoolProspectus">
            {error && <p>{error}</p>}
            {schoolInfo?.school_prospectus && (
              <>
                <h4 className="mb-2" style={{ color:"#654321" }}>
                  Download School Prospectus
                </h4>
                <a
                  href={infoBaseUrl + schoolInfo.school_prospectus}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{color:"#008000"}}
                >
                  School Prospectus
                </a>
              </>
            )}
          </div>
          <div className="hostelProspectus mt-3">
            {error && <p>{error}</p>}
            {schoolInfo?.hostel_prospectus && (
              <>
                <h4 className="mb-2" style={{ color:"#654321" }}>
                  Download Hostel Prospectus
                </h4>
                <a
                  href={infoBaseUrl + schoolInfo.hostel_prospectus}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{color:"#008000"}}
                >
                  hostel Prospectus
                </a>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
