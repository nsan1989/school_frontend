import {
  Navbar,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student_id");
    navigate("/");
  };

  return (
    <>
      <Navbar>
        <div className="accountLogin">
          <Link to="/login">
            <Button onClick={handleLogout} className="btn btn-sm btn-success">Logout</Button>
          </Link>
        </div>
      </Navbar>
    </>
  );
}
