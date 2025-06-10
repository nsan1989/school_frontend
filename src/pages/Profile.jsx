import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import "../styles/Profile.module.css";

export default function ProfileInfo() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    const getStudentApiUrl = import.meta.env.VITE_GET_STUDENT_API_URL;
    const studentBaseUrl = import.meta.env.VITE_GET_STUDENT_BASE_URL;

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
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className="student-page h-100">
            <Row className="p-3 d-flex justify-content-evenly h-100 gap-2">
                <Col md={4} className="shadow-lg rounded p-0">
                    <div className="profile-data d-flex flex-column">
                        {students && students.map((student) => (
                            <div key={student.id}>
                                <div className="profile-photo profile-background rounded">
                                    <div key={student.id}>
                                        <Image className="img-fluid stud_image border p-2" src={`${studentBaseUrl}${student.stud_photo}`} />
                                    </div>
                                </div>
                                <div className="profile-info d-flex flex-column mt-5 px-3">
                                    <h5>Personal Info</h5>
                                    <ul style={{listStyleType:"none", paddingLeft:"0px"}}>
                                        <li>Name:&nbsp;{student.stud_name}</li>
                                        <li>Gender:&nbsp;{student.gender}</li>
                                        <li>Class:&nbsp;{student.class_name}</li>
                                        <li>D.O.B:&nbsp;{student.stud_dob}</li>
                                        <li>Roll No.:&nbsp;{student.roll_no}</li>
                                        <li>Section:&nbsp;{student.section_name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
                <Col md={7}>
                    <Row className="d-flex flex-column gap-3 h-100">
                        <Col className="shadow-lg rounded p-3">
                            <div className="profile-information">
                                <h5>Address</h5>
                                {students && students.map((student) => (
                                    <ul key={student.id} style={{listStyleType:"none", paddingLeft:"0px"}}>
                                        <li>State:&nbsp;{student.state_name}</li>
                                        <li>District:&nbsp;{student.district_name}</li>
                                        <li>Address:&nbsp;{student.permanent_address}</li>
                                        <li>Pincode:&nbsp;{student.permanent_pincode}</li>
                                    </ul>
                                ))}
                            </div>
                        </Col>
                        <Col className="shadow-lg rounded p-3">
                            <div className="profile-information">
                                <h5>School Information</h5>
                                {students && students.map((student) => (
                                    <ul key={student.id} style={{listStyleType:"none", paddingLeft:"0px"}}>
                                        <li>Admission No.:&nbsp;{student.std_adm_no}</li>
                                        <li>Mode:&nbsp;{student.stud_mode}</li>
                                    </ul>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        </>
    )
}