import { color } from "framer-motion";
import { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
  const [selectedNotification, setSelectedNotification] = useState(null);

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

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  {
    /* styles */
  }
  const headerStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
    color: "white",
  };
  const textStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
    color: "white",
  };
  const tableStyle = {
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9rem",
  };
  const notificationStyle = {
    fontFamily: "Poppins, sans-serif",
    color: "white",
    listStyleType: "none",
    paddingLeft: "0px",
  };
  const ModalBackdrop = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  }
  {
    /* styles */
  }

  return (
    <>
      {students.length > 0 ? (
        <>
          <Row className="d-flex mb-2 g-2" style={{ minHeight: "40vh" }}>
            <Col
              md={8}
              className="100vh d-flex flex-column justify-content-center"
            >
              {students &&
                students.map((student) => (
                  <div className="d-flex" key={student.id}>
                    <h5
                      className="fw-bold"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#fff",
                      }}
                    >
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
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={headerStyle}>
                        Present
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={textStyle}>
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
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={headerStyle}>
                        Absent
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={textStyle}>
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
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Title className="m-0" style={headerStyle}>
                        Working Days
                      </Card.Title>
                      <Card.Body>
                        {attendance ? (
                          <>
                            <p className="m-0" style={textStyle}>
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
                <Table bordered hover style={tableStyle}>
                  <thead className="table-primary">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(holiday) && holiday.length > 0 ? (
                      holiday.slice(0, 5).map((item) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.start_date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">Content will be updated soon.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="g-2" style={{ minHeight: "40vh" }}>
            <Col md={8} className="100vh">
              <Row>
                <Col md={6} style={{ height: "40vh" }}>
                  <Card
                    className="shadow-sm rounded d-flex flex-column h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="p-2 d-flex flex-column h-100">
                      <h5
                        className="fw-bold mb-3"
                        style={{
                          color: "#ffffff",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Attendance Overview
                      </h5>

                      {/* Chart container must have height */}
                      <div style={{ flexGrow: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
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
                className="shadow-sm rounded d-flex flex-column p-2 w-100 h-100"
                style={{
                  minHeight: "40vh",
                  overflowY: "auto",
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="notification-title">
                  <h5
                    className="m-0"
                    style={{
                      color: "#ffffff",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Notifications
                  </h5>
                </div>
                <hr className="my-1" />
                <div className="notification-content" style={notificationStyle}>
                  {Array.isArray(notifications) && notifications.length > 0 ? (
                    <ul className="p-0" style={notificationStyle}>
                      {notifications.slice(0, 5).map((notification) => (
                        <li
                          key={notification.id}
                          onClick={() => openModal(notification)}
                          style={{ cursor: "pointer" }}
                        >
                          <p className="p-0 m-0" style={{ fontSize: "0.8rem" }}>
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

      {selectedNotification && (
        <div className="modal-backdrop" onClick={closeModal} style={ModalBackdrop}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: "#0071cf",
              padding: "1rem",
              borderRadius: "8px",
              maxWidth: "500px",
              margin: "10% auto",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h4>Notification</h4>
            <p>{selectedNotification.body}</p>
            <p>
              <strong>Date:</strong> {selectedNotification.date}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
