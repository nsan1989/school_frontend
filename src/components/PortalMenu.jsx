import { useState } from "react";
import {
  Navbar,
  Button,
  Container,
  Nav,
  NavbarBrand,
  Image,
} from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import Title from "../hooks/Title";

import logo from "../assets/school_logo.jpg";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { PiExam } from "react-icons/pi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";

export default function Menu({ children }) {
  Title("Student Portal");
  const [expanded, setExpanded] = useState(false);
  const toggleNavbar = () => setExpanded((prev) => !prev);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    navigate("/");
  };

  // Nav Items
  const NavItem = ({ to, label, Icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center gap-2 py-3 ${
          isActive ? "text-danger-emphasis" : "text-success"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={20} color={isActive ? "#654321" : "#28a745"} />
          {expanded && label}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <Navbar className="shadow-sm">
        <Container fluid>
          {/* Left Content */}
          <div className="leftContent">
            <Button
              variant="outline-none"
              onClick={toggleNavbar}
              className="border-0"
            >
              {expanded ? (
                <FaTimes size={20} color="#004d00" />
              ) : (
                <FaBarsStaggered size={20} color="#004d00" />
              )}
            </Button>
            <NavbarBrand>
              <Image
                className="img-fluid"
                src={logo}
                style={{ width: "48px", height: "48px" }}
              />
            </NavbarBrand>
          </div>
          {/* Right Content */}
          <div className="accountLogout ms-auto">
            <Button onClick={handleLogout} variant="link" className="p-0">
              <IoIosLogOut size={24} color="#004d00" />
            </Button>
          </div>
        </Container>
      </Navbar>
      {/* Sidebar Content */}
      <div className="d-flex" style={{ height: "100vh" }}>
        <div
          style={{
            width: expanded ? "220px" : "60px",
            backgroundColor: "white",
            transition: "width 0.3s ease",
          }}
          className="d-flex flex-column shadow-lg"
        >
          <Nav className="d-flex flex-column">
            <NavItem to="/dashboard" label="Dashboard" Icon={IoHomeOutline} />
            <NavItem to="/examination" label="Examination" Icon={PiExam} />
            <NavItem to="/fees" label="Fee" Icon={CiMoneyCheck1} />
            <NavItem to="/curriculums" label="Curriculum" Icon={GoChecklist} />
          </Nav>
        </div>
        {/* Main Content */}
        <div
          className="p-3 flex-grow-1"
          style={{
            overflowX: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
