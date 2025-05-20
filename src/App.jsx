import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import PrincipalMessage from "./pages/Principal";
import Download from "./pages/Download";
import Admission from "./pages/Admission";
import Course from "./pages/Course";
import Examination from "./pages/Examination";
import Notification from "./pages/Notification";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Alumni from "./pages/Alumni";
import Preloader from "./components/preloader";
import RulesAndRegulations from "./pages/RulesAndRegulations";
import Application from "./pages/Application";
import Staff from "./pages/Staff";
import ScrollToTop from "./components/ScrollToTop";
import StudentsPage from "./pages/StudentPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Gallery from "./pages/Gallery";
import { useEffect, useState } from "react";

const AnimatedRoutes = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/students") {
       setLoading(false);
    } else {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
    }
  }, []);

  console.log("Current route:", location.pathname);
  return loading ? (
    <Preloader />
  ) : (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about_school" element={<About />} />
      <Route path="/principal_message" element={<PrincipalMessage />} />
      <Route path="/download" element={<Download />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/course" element={<Course />} />
      <Route path="/examination" element={<Examination />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/alumni" element={<Alumni />} />
      <Route path="/rules&regulations" element={<RulesAndRegulations />} />
      <Route path="/application" element={<Application />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/students" element={<StudentsPage />} />
    </Routes>
  );
};

function App() {
  const hideLayout = location.pathname === "/students";

  return (
    <Router>
      <ScrollToTop />
      {!hideLayout && <Header />}
      <main>
        <AnimatedRoutes />
      </main>
      {!hideLayout && <Footer />}
    </Router>
  );
}

export default App;
