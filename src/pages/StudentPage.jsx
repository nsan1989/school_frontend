import { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "../styles/StudentPage.css";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [holiday, setHoliday] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [classTiming, setClassTiming] = useState([]);
  const [attendanceToday, setAttendanceToday] = useState([]);
  const [weekdays, setWeekdays] = useState([]);

  const getStudentApiUrl = import.meta.env.VITE_GET_STUDENT_API_URL;
  const getHolidayUrl = import.meta.env.VITE_HOLIDAY_API_URL;
  const getAttendance = import.meta.env.VITE_ATTENDANCE_API_URL;
  const getNotificationApiUrl = import.meta.env.VITE_NOTIFICATION_API_URL;
  const getClassTimingApiUrl = import.meta.env.VITE_CLASS_TIMING_API_URL;
  const getAttendanceTodayApiUrl = import.meta.env.VITE_ATTENDANCE_TODAY_API_URL;
  const getWeekdaysApiUrl = import.meta.env.VITE_WEEKDAYS_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
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
          body: JSON.stringify({ id: id }),
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
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
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
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setHoliday(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getHolidayUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(getNotificationApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setNotifications(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getNotificationApiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(getClassTimingApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setClassTiming(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getClassTimingApiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(getAttendanceTodayApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setAttendanceToday(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getAttendanceTodayApiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(getWeekdaysApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setWeekdays(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getWeekdaysApiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));

      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }

      try {
        const response = await fetch(getAttendance, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: auth_key,
          },
        });
        const data = await response.json();
        if (!response.ok || data.status !== "success") {
          throw new Error(data.msg || "Failed to fetch Data");
        }
        setAttendance(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [getAttendance]);

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
                      <div className="d-flex" key={student.id}>
                        <h5>Welcome!&nbsp;{student.stud_name}</h5>
                      </div>
                    ))
                  ) : (
                    <p>Loading students...</p>
                  )}
                </Col>
              </Row>
              <Row className="d-flex justify-content-between g-2 mb-3">
                <Col
                  md={4}
                  className="d-flex align-items-center"
                  style={{ minHeight: "8rem" }}
                >
                  <Card className="shadow-sm text-center w-100">
                    <Card.Title className="m-0">Present</Card.Title>
                    <Card.Body>
                      {attendance ? (
                        <>
                          <p className="m-0">{attendance.present}</p>
                        </>
                      ) : (
                        <p className="m-0">Loading attendance...</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  md={4}
                  className="d-flex align-items-center"
                  style={{ minHeight: "8rem" }}
                >
                  <Card className="shadow-sm text-center w-100 border">
                    <Card.Title className="m-0">Absent</Card.Title>
                    <Card.Body>
                      {attendance ? (
                        <>
                          <p className="m-0">{attendance.absent}</p>
                        </>
                      ) : (
                        <p className="m-0">Loading attendance...</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  md={4}
                  className="d-flex align-items-center"
                  style={{ minHeight: "8rem" }}
                >
                  <Card className="shadow-sm text-center w-100 border">
                    <Card.Title className="m-0">Working Days</Card.Title>
                    <Card.Body>
                      {attendance ? (
                        <>
                          <p className="m-0">{attendance.working_days}</p>
                        </>
                      ) : (
                        <p className="m-0">Loading attendance...</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="d-flex justify-content-between g-2">
                <Col md={6}>
                  <Card className="border shadow-sm rounded d-flex flex-column p-2"></Card>
                </Col>
                <Col md={6}>
                  <Card className="border shadow-sm rounded d-flex flex-column p-2">
                    <div className="notification-title">
                      <h5>Notifications</h5>
                    </div>
                    <div className="notification-content">
                      {Array.isArray(notifications) &&
                      notifications.length > 0 ? (
                        <ul
                          className="p-0"
                          style={{ fontSize: "0.8rem", listStyleType: "none" }}
                        >
                          {notifications.slice(0, 5).map((notification) => (
                            <li key={notification.id}>
                              <p className="p-0 m-0">
                                {notification.body.length > 50
                                  ? `${notification.body.slice(0, 50)}...`
                                  : notification.body}
                              </p>
                              <p>{notification.date}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No Data</p>
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="g-2 flex-column">
                <Col>
                  <Card className="shadow-lg p-2 table-responsive">
                    {Array.isArray(holiday) && holiday.length > 0 ? (
                      <Table bordered hover>
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
                  <Card
                    className="shadow-sm 
                  d-flex 
                  justify-content-center 
                  align-items-center"
                  >
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
