import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import useSchoolInfo from "../hooks/SchoolInfo";

import "../styles/Header.css";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "About",
    dropdown: [
      { name: "About School", path: "/about_school" },
      { name: "Principal Message", path: "/principal_message" },
      { name: "Rules & Regulations", path: "/rules&regulations" },
    ],
  },
  {
    name: "School Info",
    dropdown: [
      { name: "Staff", path: "/staff" },
      { name: "Alumni", path: "/alumni" },
      { name: "Downloads", path: "/download" },
      { name: "Gallery", path: "/gallery" },
    ],
  },
  {
    name: "Academic",
    dropdown: [
      { name: "Admission", path: "/admission" },
      { name: "Course", path: "/course" },
    ],
  },
  { name: "Examination", path: "/examination" },
  { name: "Notification", path: "/notification" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [navbarBg, setNavbarBg] = useState("rgba(255,255,255,0.9)");
  const [navbarLinks, setNavbarLinks] = useState("#fff");
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const toggleNavbar = () => setExpanded((prev) => !prev);
  const closeNavbar = () => setExpanded(false);
  const { schoolInfo, error } = useSchoolInfo();

  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg("rgba(255, 255, 255, 0.9)");
        setNavbarLinks("#654321")
      } else {
        setNavbarBg("rgba(0, 0, 0, 0.2)");
        setNavbarLinks("#fff")
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar
      className="navbar d-flex align-items-center"
      expand="lg"
      fixed="top"
      expanded={expanded}
      style={{
        transition: "background-color 0.3s ease-in-out",
        backgroundColor: isSmallScreen ? "#fff" : navbarBg,
        backdropFilter:
          !isSmallScreen && navbarBg !== "transparent" ? "blur(1px)" : "none",
        boxShadow:
          !isSmallScreen && navbarBg !== "transparent"
            ? "0px 4px 10px rgba(0,0,0,0.1)"
            : "none",
      }}
    >
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center"
          as={Link}
          to="/"
          onClick={closeNavbar}
        >
          {error && <p>{error}</p>}
          {schoolInfo?.school_photo && schoolInfo?.school_name && (
            <>
              <Image
                className="img-fluid"
                src={`${baseUrl}${schoolInfo.school_photo}`}
                alt={schoolInfo.school_name}
                style={{ width: "60px", height: "60px" }}
              />
              &nbsp;
              <div
                className="schoolName d-none d-md-flex"
              >
                <h4 style={{color: navbarLinks}}>{schoolInfo.school_name}</h4>
              </div>
            </>
          )}
        </Navbar.Brand>
        <Navbar.Toggle
          className="ms-auto"
          aria-controls="navbarNav"
          onClick={toggleNavbar}
          style={{ border: "none" }}
        >
          {expanded ? (
            <FaTimes size={"24px"} color="#654321" />
          ) : (
            <FaBarsStaggered size={"24px"} color="#654321" />
          )}
        </Navbar.Toggle>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <NavDropdown
                  key={index}
                  title={link.name}
                  id={`${link.name.toLowerCase()}-dropdown`}
                  show={
                    hoveredDropdown === index ||
                    (isSmallScreen && hoveredDropdown === index)
                  }
                  onMouseEnter={() =>
                    !isSmallScreen && setHoveredDropdown(index)
                  }
                  onMouseLeave={() =>
                    !isSmallScreen && setHoveredDropdown(null)
                  }
                  onClick={() => {
                    if (isSmallScreen) {
                      setHoveredDropdown(
                        hoveredDropdown === index ? null : index
                      );
                    }
                  }}
                  style={{ fontSize: "0.9rem", color: "#fffff" }}
                >
                  {link.dropdown.map((item, idx) => (
                    <NavDropdown.Item
                      key={idx}
                      as={Link}
                      to={item.path}
                      onClick={closeNavbar}
                    >
                      {item.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={link.path}
                  onClick={closeNavbar}
                  style={{ fontSize: "0.9rem", color: navbarLinks }}
                >
                  {link.name}
                </Nav.Link>
              )
            )}
          </Nav>
          {/*
          <div className="accountLogin">
            <Link to="/login">
              <Button
                style={{
                  backgroundColor: "#FFD700",
                  border: "none",
                  color: "#654321",
                }}
              >
                Student
              </Button>
            </Link>
          </div>
           */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
