import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

import paymentImage from "../assets/concept_payment.jpg";

export default function Register() {
  const [filters, setFilters] = useState({
    session: [],
    category: [],
    state: [],
    district: [],
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
    photo: null,
  });

  const fetchData = async (url, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (Array.isArray(data.msg)) {
        setFilters((prev) => ({ ...prev, [key]: data.msg }));
      } 
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData(import.meta.env.VITE_SESSION_API_URL, "session");
    fetchData(import.meta.env.VITE_CATEGORY_API_URL, "category");
    fetchData(import.meta.env.VITE_STATE_API_URL, "state");
    fetchData(import.meta.env.VITE_DISTRICT_API_URL, "district");
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formDataObject = new FormData();
    if (formData.photo) {
      formDataObject.append("photo", formData.photo);
    }

    const { photo, ...formDataWithoutPhoto } = formData;

    formDataObject.append("data", JSON.stringify(formDataWithoutPhoto));

    try {
      const response = await fetch(import.meta.env.VITE_REGISTER_API_URL, {
        method: "POST",
        body: formDataObject,
      });
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        setMessage("Error: Invalid response from server.");
        return;
      }

      if (response.ok) {
        setMessage("Successfully registered!");
      } 
    } catch (error) {
      setMessage("Network error, please try again later.");
    } finally {
      setLoading(false);
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

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10}>
        <Form onSubmit={handleSubmit} className="p-3 shadow rounded">
          <h4 className="mb-4 text-center">Student Registration</h4>

          {/* Session Selection */}
          <Form.Group controlId="formSession">
            <Form.Label>Session</Form.Label>
            <Form.Select required name="session" onChange={handleInputChange}>
              <option value="">Select Session</option>
              {filters.session.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.session_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Personal Details */}
          <h5 className="mt-4">Personal Information</h5>
          <Form.Group controlId="formStudentName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="student_name"
              placeholder="Enter full name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="dob"
                  onChange={handleDobChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="age"
                  value={formData.age}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
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
            <Col md={6}>
              <Form.Group controlId="formAadhaar">
                <Form.Label>Aadhaar Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="aadhaar"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  required
                  name="social_category_id"
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {filters.category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.g_cat_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPreviousSchool">
                <Form.Label>Previous School</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="previous_school_name"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPreviousBoard">
                <Form.Label>Previous Board</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="previous_school_board"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="phone_no"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Information */}
          <h5 className="mt-4">Contact Information</h5>
          <Form.Group controlId="formPresentAddress">
            <Form.Label>Present Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="present_address"
              value={formData.present_address}
              onChange={addressChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPresentState">
                <Form.Label>Present State</Form.Label>
                <Form.Select
                  required
                  name="present_state_id"
                  value={formData.present_state_id}
                  onChange={addressChange}
                >
                  <option value="">Select State</option>
                  {filters.state.map((states) => (
                    <option key={states.id} value={states.id}>
                      {states.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPresentDistrict">
                <Form.Label>Present District</Form.Label>
                <Form.Select
                  required
                  name="present_district_id"
                  value={formData.present_district_id}
                  onChange={addressChange}
                >
                  <option value="">Select District</option>
                  {filters.district.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.district_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPresentPincode">
                <Form.Label>Present Pincode</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="present_pincode"
                  value={formData.present_pincode}
                  onChange={addressChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check
              type="checkbox"
              label="Same as Present Address"
              checked={formData.sameAsPresent}
              onChange={addressChange}
            />
          </Form.Group>
          <Form.Group controlId="formPermanentAddress">
            <Form.Label>Permanent Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={addressChange}
              disabled={formData.sameAsPresent}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPermanentState">
                <Form.Label>Permanent State</Form.Label>
                <Form.Select
                  required
                  name="permanent_state_id"
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                >
                  <option value="">Select State</option>
                  {filters.state.map((newState) => (
                    <option key={newState.id} value={newState.id}>
                      {newState.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPermanentDistrict">
                <Form.Label>Permanent District</Form.Label>
                <Form.Select
                  required
                  name="permanent_district_id"
                  value={formData.permanent_district_id}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                >
                  <option value="">Select district</option>
                  {filters.district.map((distNew) => (
                    <option key={distNew.id} value={distNew.id}>
                      {distNew.district_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPermanentPincode">
                <Form.Label>Permanent Pincode</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="permanent_pincode"
                  value={formData.permanent_pincode}
                  onChange={addressChange}
                  disabled={formData.sameAsPresent}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Parents Information */}
          <h5 className="mt-4">Parents' Information</h5>
          <Form.Group controlId="formFatherName">
            <Form.Label>Father's Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="father_name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFatherOccupation">
            <Form.Label>Father's Occupation</Form.Label>
            <Form.Control
              required
              type="text"
              name="father_occupation"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFatherIncome">
            <Form.Label>Father's Annual Income</Form.Label>
            <Form.Control
              required
              type="text"
              name="father_annual_income"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formMotherName">
            <Form.Label>Mother's Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="mother_name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formMotherOccupation">
            <Form.Label>Mother's Occupation</Form.Label>
            <Form.Control
              required
              type="text"
              name="mother_occupation"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formMotherIncome">
            <Form.Label>Mother's Annual Income</Form.Label>
            <Form.Control
              required
              type="text"
              name="mother_annual_income"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formParentPhone">
                <Form.Label>Parent Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="parent_phone"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formParentAltPhone">
                <Form.Label>Alternate Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="parent_alt_phone"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Payment Scanner */}
          <Row className="py-3">
            <Col md={6}>
              <div className="paymentScanner text-center">
                <Image className="img-fluid" src={paymentImage} style={{width:"auto", height:"104px"}} />
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div className="paymentInstructions">
                <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                  <li>
                    &#42;&nbsp;
                    <small>
                      Kindly scan the QR code to proceed with the payment.
                    </small>
                  </li>
                  &nbsp;
                  <li>
                    &#42;&nbsp;
                    <small>
                      Please capture and upload a screenshot of the payment
                      information.
                    </small>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* Photo Upload */}
          <Form.Group controlId="formPhoto">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control
              required
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

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
