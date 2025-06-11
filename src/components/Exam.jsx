import { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal } from "react-bootstrap";

export default function ExamInfo() {
  const [examInfo, setExamInfo] = useState([]);
  const [examDetail, setExamDetail] = useState([]);
  const [examResult, setExamResult] = useState([]);
  const [error, setError] = useState(null);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const examApiUrl = import.meta.env.VITE_EXAM_API_URL;
  const examRoutineApi = import.meta.env.VITE_EXAM_ROUTINE_API_URL;
  const examResultApi = import.meta.env.VITE_EXAM_RESULT_API_URL;

  const openDetailModal = (exam) => {
    setSelectedExam(exam);
    setShowDetailModal(true);
  };

  const openResultModal = (exam) => {
    setSelectedExam(exam);
    setShowResultModal(true);
  };

  const handleClose = () => {
    setShowDetailModal(false);
    setShowResultModal(false);
    setSelectedExam(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));
      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(examApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch exam info.");
        }

        if (data.msg && data.msg.length > 0) {
          const examID = data.msg[0].id;
          localStorage.setItem("id", examID);
        }
        setExamInfo(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));
      const exam_id = parseInt(localStorage.getItem("student_id"));
      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
          body: JSON.stringify({ exam_id: exam_id }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setter(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData(examRoutineApi, setExamDetail);
    fetchData(examResultApi, setExamResult);
  }, [examRoutineApi, examResultApi]);

  return (
    <>
      <Row>
        <Col>
          <div className="exam-title">
            <h5 style={{ color: "#004d00" }}>Examination</h5>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="table-responsive">
          <Table bordered>
            <thead style={{color:"#004d00"}}>
              <tr>
                <th>Exam Name</th>
                <th>Time Table</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {examInfo && examInfo.length > 0 ? (
                examInfo.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.exam_name}</td>
                    <td>
                      <Button
                        className="btn-sm btn-info"
                        onClick={() => openDetailModal(exam)}
                      >
                        Details
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn-sm btn-warning"
                        onClick={() => openResultModal(exam)}
                      >
                        Result
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Routine Modal */}
      <Modal show={showDetailModal} onHide={handleClose} centered style={{color:"#004d00"}}>
        <Modal.Header>
          <Modal.Title>Exam Routine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExam ? (
            <>
              <div className="table-responsive">
                <Table striped bordered hover className="w-100">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Timing</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(examDetail) && examDetail.length > 0 ? (
                      examDetail.map((exam) => (
                        <tr key={exam.id}>
                          <td>{exam.subject_name}</td>
                          <td>{exam.exam_date}</td>
                          <td>
                            {exam.start_time} - {exam.end_time}
                          </td>
                          <td>{exam.duration} hrs</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No exam details found.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Result Modal */}
      <Modal show={showResultModal} onHide={handleClose} centered style={{color:"#004d00"}}>
        <Modal.Header closeButton>
          <Modal.Title>Exam Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="table-responsive">
          {selectedExam ? (
            <Table bordered>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Attendance</th>
                  <th>Mark Obtain</th>
                  <th>Practical Mark</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(examResult) && examResult.length > 0 ? (
                  examResult.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.subject_name}</td>
                      <td>{exam.attendance}</td>
                      <td>{exam.mark_obtain}</td>
                      <td>{exam.prac_mark_obtain}</td>
                      <td>{exam.note}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No exam details found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
