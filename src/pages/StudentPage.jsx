import { useEffect, useState } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const getStudentApiUrl = import.meta.env.VITE_GET_STUDENT_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = localStorage.getItem("student_id");

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("Invalid student ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(getStudentApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
          body: JSON.stringify({ id: parsedId }),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch students");
        }

        setStudents(data.msg);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, [getStudentApiUrl]);

  return (
    <>
      <div>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {students.length > 0 ? (
          <Row className="d-flex justify-content-center">
            <Col md={8}></Col>
            <Col md={4}>
              <Card className="shadow-lg d-flex align-items-center justify-content-center">
                <ul className="ps-0 mb-0 py-3" style={{listStyleType:"none"}}>
                  {students.map((student) => (
                    <div key={student.id}>
                      <li className="text-center mb-2">
                         <Image className="shadow-sm p-2" src={student.stud_photo} alt="Student Photo" fluid rounded />
                      </li>
                      <li>
                        <span>
                          <strong>Name:</strong> {student.stud_name}
                        </span>
                      </li>
                      <li>
                        <span>
                          <strong>Class:</strong> {student.class_name}
                        </span>
                      </li>
                    </div>
                  ))}
                </ul>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </>
  );
}
