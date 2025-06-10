import { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

export default function Notes() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = import.meta.env.VITE_SUBJECT_API_URL;
  const classNotesUrl = import.meta.env.VITE_CLASS_NOTES_API_URL;
  const classNotesBaseUrl = import.meta.env.VITE_CLASS_NOTES_BASE_URL;

  const handleShow = async (noteId) => {
    await fetchNotes(noteId);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedSubjectId(null);
  };

  // Get subjects
  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        setLoading(false);
        return;
      }

      try {
        const urlWithParams = `${apiUrl}?id=${id}`;
        const response = await fetch(urlWithParams, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        setSubjects(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  // To fetch class notes contents for each subjects.
  const fetchNotes = async (subjectId) => {
    const auth_key = localStorage.getItem("auth_key");
    const id = parseInt(localStorage.getItem("student_id"));

    if (isNaN(id)) {
      setError("Invalid student ID");
      setLoading(false);
      return [];
    }

    try {
      const urlWithParams = `${classNotesUrl}?id=${id}`;
      const response = await fetch(urlWithParams, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: auth_key,
        },
        body: JSON.stringify({ subject_id: subjectId }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setNotes(data.msg);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && <p className="text-danger text-center">{error}</p>}

      {Array.isArray(subjects) && subjects.length > 0 ? (
        subjects.map((sub, index) => (
          <Button
            className="btn-sm me-2 mb-2 border"
            key={index}
            onClick={() => handleShow(sub.id)}
            style={{
              cursor: "pointer",
              transition: "0.3s",
              width: "12rem"
            }}
          >
            {sub.subject_name}
          </Button>
        ))
      ) : (
        <p className="text-center text-muted">Content will be updated soon.</p>
      )}
      {/* Pop up window */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notes.length > 0 ? (
            <>
              <div className="d-flex">
                <strong>Topic:</strong>&nbsp;<p>{notes[0].topic}</p>
              </div>
              <div className="d-flex">
                <strong>File:</strong>&nbsp;
                <a
                  href={`${classNotesBaseUrl}${notes[0].file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </div>
            </>
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
