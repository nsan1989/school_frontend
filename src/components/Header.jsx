import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Image,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import useSchoolInfo from "../hooks/SchoolInfo";

import "../styles/Header.module.css";

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
  { name: "Notices", path: "/notification" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [navbarBg, setNavbarBg] = useState("");
  const [navbarLinks, setNavbarLinks] = useState("#ffffff");
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < 767.99
  );
  const toggleNavbar = () => setExpanded((prev) => !prev);
  const closeNavbar = () => setExpanded(false);
  const { schoolInfo, error } = useSchoolInfo();

  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg("rgba(255, 255, 255, 0.9)");
        setNavbarLinks("#004d00");
      } else {
        setNavbarBg("rgba(0, 0, 0, 0.2)");
        setNavbarLinks("#ffffff");
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
          className="d-flex align-items-center h-100"
          as={Link}
          to="/"
          onClick={closeNavbar}
        >
          {error && <p>{error}</p>}
          {schoolInfo?.school_photo && schoolInfo?.school_name && (
            <>
              <div className="d-flex align-items-center h-100">
                <Image
                  className="img-fluid"
                  src={`${baseUrl}${schoolInfo.school_photo}`}
                  alt={schoolInfo.school_name}
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div className="d-none d-md-flex align-items-center h-100 ms-2">
                <p
                  className="text-capitalize fw-bold m-0"
                  style={{
                    color: navbarLinks,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  {schoolInfo.school_name}
                </p>
              </div>
            </>
          )}
        </Navbar.Brand>
        <Navbar.Toggle
          className="ms-auto p-0 bg-transparent border-0 shadow-none focus-shadow-none"
          aria-controls="navbarNav"
          onClick={toggleNavbar}
        >
          {expanded ? (
            <FaTimes size={"24px"} color="#004d00" />
          ) : (
            <FaBarsStaggered size={"24px"} color="#004d00" />
          )}
        </Navbar.Toggle>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <NavDropdown
                  key={index}
                  title={
                    <span style={{ color: navbarLinks }}>{link.name}</span>
                  }
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
                  style={{ fontSize: "0.9rem" }}
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
          <div className="accountLogin">
            <Link to="/login" target="_blank">
              <Button className="btn btn-sm btn-warning text-light">Student</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
