import { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
  const [filter, setFilter] = useState("daily");

  const getStudentApiUrl = import.meta.env.VITE_GET_STUDENT_API_URL;
  const getHolidayUrl = import.meta.env.VITE_HOLIDAY_API_URL;
  const getAttendance = import.meta.env.VITE_ATTENDANCE_API_URL;
  const getNotificationApiUrl = import.meta.env.VITE_NOTIFICATION_API_URL;
  const getClassTimingApiUrl = import.meta.env.VITE_CLASS_TIMING_API_URL;
  const getAttendanceTodayApiUrl = import.meta.env
    .VITE_ATTENDANCE_TODAY_API_URL;
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
        console.log(data);
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

  const chartData = [
    { name: "WD", value: attendance.working_days || 0 },
    { name: "P", value: attendance.present || 0 },
    {
      name: "A",
      value: isNaN(attendance.absent) ? 0 : Number(attendance.absent),
    },
    { name: "OP %", value: attendance.att_pc || 0 },
  ];

  const barColors = {
    WD: "yellow",
    P: "green",
    A: "red",
    "OP %": "blue",
  };

  return (
    <>
      {students.length > 0 ? (
        <>
          <Row className="d-flex mb-2 g-2" style={{ minHeight: "40vh" }}>
            <Col md={8} className="100vh d-flex flex-column justify-content-center">
              {students &&
                students.map((student) => (
                  <div className="d-flex" key={student.id}>
                    <h5 className="fw-bold" style={{ color: "#004d00" }}>
                      Welcome!&nbsp;{student.stud_name}
                    </h5>
                  </div>
                ))}
              <div>
                <Row className="d-flex justify-content-between g-2 mb-3 w-100">
                  <Col md={4} className="d-flex align-items-center">
                    <Card
                      className="shadow-sm text-center w-100 py-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(12px)",
                        webkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={{ color: "#004d00" }}>
                        Present
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={{ color: "#004d00" }}>
                              {attendance.present}
                            </p>
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
                    <Card
                      className="shadow-sm text-center w-100 py-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(12px)",
                        webkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={{ color: "#004d00" }}>
                        Absent
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={{ color: "#004d00" }}>
                              {attendance.absent}
                            </p>
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
                    <Card
                      className="shadow-sm text-center w-100 py-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(12px)",
                        webkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={{ color: "#004d00" }}>
                        Working Days
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={{ color: "#004d00" }}>
                              {attendance.working_days}
                            </p>
                          </>
                        ) : (
                          <p className="m-0">Loading attendance...</p>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4} className="100vh">
              <Card
                className="shadow-sm p-2 table-responsive"
                style={{
                  minHeight: "40vh",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  overflowY: "auto",
                }}
              >
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
          </Row>
          <Row className="g-2" style={{ minHeight: "40vh" }}>
            <Col md={8} className="100vh">
              <Row>
                <Col md={6} style={{ height: "40vh" }}>
                  <Card
                    className="border shadow-sm rounded d-flex flex-column h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="p-2 d-flex flex-column h-100">
                      <h5 className="fw-bold mb-3" style={{ color: "#004d00" }}>
                        Attendance Overview
                      </h5>

                      {/* Chart container must have height */}
                      <div style={{ flexGrow: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            {/* Optional: remove this if you don’t want grid lines */}
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value">
                              {chartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={barColors[entry.name] || "#8884d8"}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col md={6}></Col>
              </Row>
            </Col>
            <Col md={4} className="100vh">
              <Card
                className="border shadow-sm rounded d-flex flex-column p-2 w-100 h-100"
                style={{
                  minHeight: "40vh",
                  overflowY: "auto",
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(12px)",
                  webkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="notification-title">
                  <h5 className="m-0" style={{ color: "#004d00" }}>
                    Notifications
                  </h5>
                </div>
                <hr className="my-1" />
                <div className="notification-content">
                  {Array.isArray(notifications) && notifications.length > 0 ? (
                    <ul
                      className="p-0"
                      style={{
                        fontSize: "0.8rem",
                        listStyleType: "none",
                      }}
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
        </>
      ) : (
        <p>Loading students...</p>
      )}
    </>
  );
}
