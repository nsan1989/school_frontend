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
import { MdSchedule } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

export default function Menu({ children }) {
  Title("Student Portal");
  const [expanded, setExpanded] = useState(false);
  const toggleNavbar = () => setExpanded((prev) => !prev);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    navigate("/login");
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
          <Icon size={20} color={isActive ? "#654321" : "#004d00"} />
          {expanded && label}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      <Navbar
        className="shadow-sm position-absolute w-100 bg-light"
        style={{ zIndex: "999" }}
      >
        <Container fluid>
          {/* Left Content */}
          <div className="leftContent d-flex">
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
            <NavbarBrand className="d-flex align-items-center">
              <Image
                className="img-fluid me-2"
                src={logo}
                style={{ width: "48px", height: "48px" }}
              />
              &nbsp;
              <div className="d-flex flex-column" style={{color:"#004d00"}}>
                <h5 className="m-0 d-none d-md-flex">St. Anthony's School</h5>
                <small style={{fontSize:"0.8rem"}}>student portel</small>
              </div>
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
            marginTop: "4rem",
          }}
          className="d-flex flex-column shadow-lg"
        >
          <Nav className="d-flex flex-column">
            <NavItem to="/dashboard" label="Dashboard" Icon={IoHomeOutline} />
            <NavItem to="/examination" label="Examination" Icon={PiExam} />
            <NavItem to="/time_table" label="Time Table" Icon={MdSchedule} />
            <NavItem to="/fees" label="Fee" Icon={CiMoneyCheck1} />
            <NavItem to="/curriculums" label="Curriculum" Icon={GoChecklist} />
            <NavItem
              to="/profile_info"
              label="Profile"
              Icon={FaRegUserCircle}
            />
          </Nav>
        </div>
        {/* Main Content */}
        <div
          className="p-3 flex-grow-1"
          style={{
            overflowX: "hidden",
            marginTop: "4rem",
            background: "linear-gradient(135deg, #f0f4c3, #dcedc8)",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
