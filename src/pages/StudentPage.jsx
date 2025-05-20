import { useEffect, useState } from "react";

import Menu from "../components/PortalMenu";

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
    <Menu />
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.stud_name} - {student.class_name} {student.section_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading students...</p>
      )}
    </div>
    </>
  );
}
