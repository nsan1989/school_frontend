import { useState, useEffect } from "react";

export default function Notice() {
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_NOTICE_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setNotice(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    {error && <p>{error}</p>}
      {Array.isArray(notice) && notice.length > 0 ? (
        notice
          .filter((n) => n.notice_date)
          .sort((a, b) => new Date(b.notice_date) - new Date(a.notice_date))
          .slice(0, 10)
          .map((notices) => (
            <div
              className="noticeContent"
              key={notices.id || notices.notice_date}
            >
              <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
                <li className="noticeHeader">
                  <b>{notices.header}</b>
                </li>
                <li className="noticeDate">{notices.notice_date}</li>
                <li className="noticeBody py-2">{notices.body}</li>
              </ul>
            </div>
          ))
      ) : (
        <p>We are in the process of updating this content. Stay tuned!</p>
      )}
    </>
  );
}
