import { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Notes() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = import.meta.env.VITE_SUBJECT_API_URL;
  const classNotesUrl = import.meta.env.VITE_CLASS_NOTES_API_URL;

  // Get subjects
  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = localStorage.getItem("student_id");

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("Invalid student ID");
        setLoading(false);
        return;
      }

      try {
        const urlWithParams = `${apiUrl}?id=${parsedId}`;
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
    console.log("📦 subject_id received in fetchNotes:", subjectId);
    const auth_key = localStorage.getItem("auth_key");
    const id = localStorage.getItem("student_id");

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      setError("Invalid student ID");
      setLoading(false);
      return;
    }

    try {
      const urlWithParams = `${classNotesUrl}?id=${parsedId}`;
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
      console.log(data);
      setNotes(data.msg);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Row className="d-flex g-2">
        {error && <p className="text-danger">{error}</p>}
        {Array.isArray(subjects) && subjects.length > 0 ? (
          subjects.map((sub, index) => (
            <Col key={index}>
              <Link to="" style={{ textDecoration: "None" }}>
                <Button
                  variant="primary"
                  className="shadow-sm d-flex flex-column align-items-center justify-content-center"
                  style={{ width: "15rem" }}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                    fetchNotes(sub.id);
                  }}
                >
                  <p>{sub.subject_name}</p>
                </Button>
              </Link>
            </Col>
          ))
        ) : (
          <p className="text-center">Content will be updated soon.</p>
        )}
      </Row>
    </>
  );
}
