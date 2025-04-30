import { useState, useEffect } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/Common.css";

export default function Register() {
  const [filters, setFilters] = useState({
    session: [],
    category: [],
    state: [],
    district: [],
    class: [],
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    session: "",
    student_name: "",
    dob: "",
    age: "",
    gender: "",
    phone_no: "",
    email: "",
    aadhaar: "",
    social_category_id: "",
    father_name: "",
    father_occupation: "",
    father_annual_income: "",
    mother_name: "",
    mother_occupation: "",
    mother_annual_income: "",
    parent_phone: "",
    parent_alt_phone: "",
    present_address: "",
    present_district_id: "",
    present_state_id: "",
    present_pincode: "",
    permanent_address: "",
    permanent_district_id: "",
    permanent_state_id: "",
    permanent_pincode: "",
    previous_school_name: "",
    previous_school_board: "",
    class_id: "",
    sameAsPresent: false,
  });

  const fetchData = async (url, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFilters((prev) => ({ ...prev, [key]: data.msg }));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_SESSION_API_URL, "session");
    fetchData(import.meta.env.VITE_CATEGORY_API_URL, "category");
    fetchData(import.meta.env.VITE_STATE_API_URL, "state");
    fetchData(import.meta.env.VITE_DISTRICT_API_URL, "district");
    fetchData(import.meta.env.VITE_CLASS_API_URL, "class");
  }, []);

  //Age Calculator
  const handleDobChange = (e) => {
    const dob = e.target.value;
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData({
        ...formData,
        dob,
        age: age.toString(),
      });
    }
  };

  //Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = {
      session: parseInt(e.target.session.value, 10),
      student_name: e.target.student_name.value.trim(),
      dob: e.target.dob.value,
      age: e.target.age.value.trim(),
      gender: e.target.gender.value.trim(),
      phone_no: e.target.phone_no.value.trim(),
      email: e.target.email.value.trim(),
      aadhaar: e.target.aadhaar.value.trim(),
      social_category_id: parseInt(e.target.social_category_id.value, 10),
      father_name: e.target.father_name.value.trim(),
      father_occupation: e.target.father_occupation.value.trim(),
      father_annual_income: e.target.father_annual_income.value.trim(),
      mother_name: e.target.mother_name.value.trim(),
      mother_occupation: e.target.mother_occupation.value.trim(),
      mother_annual_income: e.target.mother_annual_income.value.trim(),
      parent_phone: e.target.parent_phone.value.trim(),
      parent_alt_phone: e.target.parent_alt_phone.value.trim(),
      present_address: e.target.present_address.value.trim(),
      present_district_id: parseInt(e.target.present_district_id.value, 10),
      present_state_id: parseInt(e.target.present_state_id.value, 10),
      present_pincode: e.target.present_pincode.value.trim(),
      permanent_address: e.target.permanent_address.value.trim(),
      permanent_district_id: parseInt(e.target.permanent_district_id.value, 10),
      permanent_state_id: parseInt(e.target.permanent_state_id.value, 10),
      permanent_pincode: e.target.permanent_pincode.value.trim(),
      previous_school_name: e.target.previous_school_name.value.trim(),
      previous_school_board: e.target.previous_school_board.value.trim(),
      class_id: parseInt(e.target.session.value, 10),
    };

    try {
      const response = await fetch(import.meta.env.VITE_REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      const result = await response.json();
      console.log(result);
      setMessage("Successfully register!", result);
    } catch (error) {
      setError(error.message);
    }
  };

  //Handle address change
  const addressChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        sameAsPresent: checked,
        permanent_address: checked ? prevData.present_address : "",
        permanent_district_id: checked ? prevData.present_district_id : "",
        permanent_state_id: checked ? prevData.present_state_id : "",
        permanent_pincode: checked ? prevData.present_pincode : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        ...(name.startsWith("present_") && prevData.sameAsPresent
          ? {
              permanent_address:
                name === "present_address" ? value : prevData.permanent_address,
              permanent_district_id:
                name === "present_district_id"
                  ? value
                  : prevData.permanent_district_id,
              permanent_state_id:
                name === "present_state_id"
                  ? value
                  : prevData.permanent_state_id,
              permanent_pincode:
                name === "present_pincode" ? value : prevData.permanent_pincode,
            }
          : {}),
      }));
    }
  };

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <Row className="justify-content-center pt-5">
      <div className="py-2 text-center">
        <p>
          To check your application status{" "}
          <Link to="/application" style={{textDecoration:"none", color:"#008000"}}>click here</Link>.
        </p>
      </div>
      <Col>
        <Form onSubmit={handleSubmit} className="p-3 shadow rounded" style={{color:"#654321"}}>
          <h4 className="mb-4 text-center">Student Registration</h4>
          <h3 className="text-center mb-4">
            {currentYear} - {nextYear}
          </h3>
          <Row>
            <Col md={6}>
              {/* Session Selection */}
              <Form.Group controlId="formSession">
                <Form.Select
                  required
                  name="session"
                  onChange={handleInputChange}
                >
                  <option value="">Select Session</option>
                  {filters.session.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.session_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formClass">
                <Form.Select
                  required
                  name="class_id"
                  onChange={handleInputChange}
                >
                  <option value="">Select Class</option>
                  {filters.class.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.class_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Personal Details */}
          <h5 className="mt-4">Personal Information</h5>
          <Row>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formStudentName">
                <Form.Control
                  required
                  type="text"
                  name="student_name"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formDOB">
                <Form.Control
                  required
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  onChange={handleDobChange}
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formAge">
                <Form.Control
                  required
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formGender">
                <Form.Select
                  required
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formAadhaar">
                <Form.Control
                  required
                  type="text"
                  name="aadhaar"
                  placeholder="Aadhaar"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formCategory">
                <Form.Select
                  required
                  name="social_category_id"
                  onChange={handleInputChange}
                >
                  <option value="">Category</option>
                  {filters.category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.g_cat_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formPreviousSchool">
                <Form.Control
                  required
                  type="text"
                  name="previous_school_name"
                  placeholder="Previous School"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formPreviousBoard">
                <Form.Control
                  required
                  type="text"
                  name="previous_school_board"
                  placeholder="Previous Board"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col className="mb-3" md={6}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Control
                  required
                  type="text"
                  name="phone_no"
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Information */}
          <h5 className="mt-4">Contact Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPresentAddress">
                <Form.Control
                  required
                  type="text"
                  name="present_address"
                  placeholder="Present Address"
                  value={formData.present_address}
                  onChange={addressChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPresentState">
                <Form.Select
                  required
                  name="present_state_id"
                  placeholder="Present State"
                  value={formData.present_state_id}
                  onChange={addressChange}
                >
                  <option value="">State</option>
                  {filters.state.map((states) => (
                    <option key={states.id} value={states.id}>
                      {states.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPresentDistrict">
                <Form.Select
                  required
                  name="present_district_id"
                  value={formData.present_district_id}
                  onChange={addressChange}
                >
                  <option value="">District</option>
                  {filters.district.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.district_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPresentPincode">
                <Form.Control
                  required
                  type="text"
                  name="present_pincode"
                  placeholder="Present Pincode"
                  value={formData.present_pincode}
                  onChange={addressChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-md-none" controlId="formCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Same as Present Address"
                  checked={formData.sameAsPresent}
                  onChange={addressChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPermanentAddress">
                <Form.Control
                  required
                  type="text"
                  name="permanent_address"
                  placeholder="Permanent Address"
                  value={formData.permanent_address}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPermanentState">
                <Form.Select
                  required
                  name="permanent_state_id"
                  value={formData.permanent_state_id}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                >
                  <option value="">State</option>
                  {filters.state.map((newState) => (
                    <option key={newState.id} value={newState.id}>
                      {newState.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPermanentDistrict">
                <Form.Select
                  required
                  name="permanent_district_id"
                  value={formData.permanent_district_id}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                >
                  <option value="">District</option>
                  {filters.district.map((distNew) => (
                    <option key={distNew.id} value={distNew.id}>
                      {distNew.district_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPermanentPincode">
                <Form.Control
                  required
                  type="text"
                  name="permanent_pincode"
                  placeholder="Permanent Pincode"
                  value={formData.permanent_pincode}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 d-none d-md-flex"
                controlId="formCheckbox2"
              >
                <Form.Check
                  type="checkbox"
                  label="Same as Present Address"
                  checked={formData.sameAsPresent}
                  onChange={addressChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Parents Information */}
          <h5 className="mt-4">Parents' Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formFatherName">
                <Form.Control
                  required
                  type="text"
                  name="father_name"
                  placeholder="Father Name"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFatherOccupation">
                <Form.Control
                  required
                  type="text"
                  name="father_occupation"
                  placeholder="Father Occupation"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFatherIncome">
                <Form.Control
                  required
                  type="text"
                  name="father_annual_income"
                  placeholder="Annual Income"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formParentPhone">
                <Form.Control
                  required
                  type="text"
                  name="parent_phone"
                  placeholder="Phone"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formMotherName">
                <Form.Control
                  required
                  type="text"
                  name="mother_name"
                  placeholder="Mother Name"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMotherOccupation">
                <Form.Control
                  required
                  type="text"
                  name="mother_occupation"
                  placeholder="Mother Occupation"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMotherIncome">
                <Form.Control
                  required
                  type="text"
                  name="mother_annual_income"
                  placeholder="Annual Income"
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formParentAltPhone">
                <Form.Control
                  required
                  type="text"
                  name="parent_alt_phone"
                  placeholder="Alternate Phone"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="py-3 text-center">
            <Button variant="warning" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
          <div className="successfulMessage text-center">{message}</div>
        </Form>
      </Col>
    </Row>
  );
}
