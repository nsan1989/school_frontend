import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import "../styles/Header.css";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "About",
    dropdown: [
      { name: "About School", path: "/about_school" },
      { name: "Principal Message", path: "/principal_message" },
    ],
  },
  {
    name: "School Info",
    dropdown: [
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
  { name: "Notification", path: "/notification" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [navbarLinks, setNavbarLinks] = useState("#ffffff");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 767.99);
  const toggleNavbar = () => setExpanded((prev) => !prev);
  const closeNavbar = () => setExpanded(false);
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_INFO_API_URL;
  const baseUrl = import.meta.env.VITE_INFO_BASE_URL;

  {/* School info */}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setInfo(data.msg);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg("rgba(0, 113, 188, 0.9)");
        setNavbarLinks("#ffffff");
      } else {
        setNavbarBg("rgba(0, 0, 0, 0.1)");
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
      className="navbar py-2"
      expand="lg"
      fixed="top"
      expanded={expanded}
      style={{
        transition: "background-color 0.3s ease-in-out",
        backgroundColor: isSmallScreen ? "#0071BC" : navbarBg,
        backdropFilter:
          !isSmallScreen && navbarBg !== "transparent" ? "blur(1px)" : "none",
        boxShadow:
          !isSmallScreen && navbarBg !== "transparent"
            ? "0px 4px 10px rgba(0,0,0,0.1)"
            : "none",
      }}
    >
      <Container>
        {error && <p>{error}</p>}
        {info.map((infos, index) => (
          <Navbar.Brand as={Link} to="/" onClick={closeNavbar} key={index}>
            <Image
              className="img-fluid object-fit-contain"
              src={`${baseUrl}${infos.school_photo}`}
              style={{height:"48px"}}
            />
          </Navbar.Brand>
        ))}
        <Navbar.Toggle
          className="ms-auto p-0 bg-transparent border-0 shadow-none focus-shadow-none"
          aria-controls="navbarNav"
          onClick={toggleNavbar}
          style={{ border: "none", outline: "none", boxShadow: "none" }}
        >
          {expanded ? (
            <FaTimes size={"24px"} color="#FFD700" />
          ) : (
            <FaBarsStaggered size={"24px"} color="#FFD700" />
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
            <Link target="blank" to="/login">
              <Button className="btn btn-sm btn-warning">
                Student
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
