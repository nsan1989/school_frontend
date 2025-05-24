import { useEffect, useState } from "react";
import { Row, Col, Card, Image, Table } from "react-bootstrap";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "../styles/StudentPage.css";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [holiday, setHoliday] = useState([]);

  const getStudentApiUrl = import.meta.env.VITE_GET_STUDENT_API_URL;
  const getHolidayUrl = import.meta.env.VITE_HOLIDAY_API_URL;

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

  useEffect(() => {
    const fetchHoliday = async () => {
      const auth_key = localStorage.getItem("auth_key");
      console.log(auth_key);
      const id = localStorage.getItem("student_id");
      console.log(id);

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        setError("Invalid student ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(getHolidayUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Holidays");
        }
        setHoliday(data.msg);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHoliday();
  }, [getHolidayUrl]);

  return (
    <>
      <div>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {students.length > 0 ? (
          <Row className="d-flex justify-content-center g-2 py-3">
            <Col md={8}>
              <Row>
                <Col>
                  {students && students.length > 0 ? (
                    students.map((student) => (
                      <div className="d-flex mb-3" key={student.id}>
                        <h5>Welcome!&nbsp;{student.stud_name}</h5>
                      </div>
                    ))
                  ) : (
                    <p>Loading students...</p>
                  )}
                </Col>
              </Row>
              <Row className="d-flex justify-content-evenly g-2">
                <Col md={3}>
                  <Card className="shadow-sm text-center">Attendance</Card>
                </Col>
                <Col md={3}>
                  <Card className="shadow-sm text-center">content</Card>
                </Col>
                <Col md={3}>
                  <Card className="shadow-sm text-center">content</Card>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="g-2 flex-column">
                <Col>
                  <Card className="shadow-lg p-2 table-responsive">
                    {Array.isArray(holiday) && holiday.length > 0 ? (
                      <Table bordered hover rounded>
                        <thead className="table-warning">
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holiday.slice(0, 5).map((item) => (
                            <tr key={item.id}>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
                              <td>{item.start_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>Content will be updated soon.</p>
                    )}
                  </Card>
                </Col>
                <Col>
                  <Card className="shadow-sm d-flex justify-content-center align-items-center">
                    <Calendar
                      className="custom-calendar"
                      onChange={setDate}
                      value={date}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <p>Loading students...</p>
        )}
      </div>
    </>
  );
}
