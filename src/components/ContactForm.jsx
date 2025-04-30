import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "../styles/Common.css";

export default function ContactForm() {
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage("Successfully sent!", data);
        setFormData({ fullname: "", phone: "", email: "", message: "" });
      } else {
        setMessage("Failed to sent message.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="contactForm p-3 rounded shadow">
      <Form onSubmit={handleSubmit} style={{color:"#654321"}}>
        <Form.Group className="mb-3" controlId="formFullName">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTextarea">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="enter your message here"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          size="md"
          style={{
            backgroundColor: "#654321",
            border: "none",
            color: "#ffffff",
          }}
        >
          SEND
        </Button>
        &nbsp;
        {message}
      </Form>
    </div>
  );
}
