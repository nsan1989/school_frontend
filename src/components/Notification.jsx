import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const notificationApiUrl = import.meta.env.VITE_NOTIFICATION_API_URL;
  const updateNotificationUrl = import.meta.env
    .VITE_NOTIFICATION_UPDATE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const auth_key = localStorage.getItem("auth_key");
      const id = parseInt(localStorage.getItem("student_id"));
      if (isNaN(id)) {
        setError("Invalid student ID");
        return;
      }
      try {
        const response = await fetch(notificationApiUrl, {
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
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [notificationApiUrl]);

  return (
    <>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="table-responsive">
        <Table>
          <thead>
            <tr className="fw-bold">
              <th>Notifications</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr>
                  <td>{notification.body}</td>
                  <td>{notification.date}</td>
                </tr>
              ))
            ) : (
              <p>Loading students...</p>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
