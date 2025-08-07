import { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Title from "../hooks/Title";

import "../styles/Common.css";

export default function Course() {
  Title("Course");
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_COURSE_API_URL;
  const baseUrl = import.meta.env.VITE_COURSE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setCourse(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="courseHeader">
        <div className="courseTitle">
          <h1 className="display-5 mt-auto py-3 fw-bold">COURSE</h1>
        </div>
      </div>
      <div className="courseContent py-5">
        <Container>
          {error && <p>{error}</p>}
          {Array.isArray(course) && course.length > 0 ? (
            course.map((courses, index) => (
              <div className="courseImage" key={index}>
                <Image className="img-fluid" src={`${baseUrl}${courses.docs}`} />
              </div>
            ))
          ) : (
            <p>No course available!</p>
          )}
        </Container>
      </div>
    </>
  );
}
