import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Menu from "./components/PortalMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import PrincipalMessage from "./pages/Principal";
import Download from "./pages/Download";
import Admission from "./pages/Admission";
import Course from "./pages/Course";
import Notification from "./pages/Notification";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Preloader from "./components/preloader";
import Application from "./pages/Application";
import ScrollToTop from "./components/ScrollToTop";
import StudentsPage from "./pages/StudentPage";
import Examination from "./pages/Examination";
import Fees from "./pages/Fee";
import Curriculums from "./pages/Curriculum";
import SchoolFees from "./components/SchoolFee";
import Hostel from "./components/Hostel";
import TransportFee from "./components/Transport";
import TimeTables from "./pages/TimeTable";
import ProfileInfo from "./pages/Profile";
import TermsConditions from "./pages/Term&Condition";
import PrivacyPolicy from "./pages/Privacy";
import RefundPolicy from "./pages/Refund";
import PricingPolicy from "./pages/Pricing";
import ShippingDelivery from "./pages/Shipping&Delivery";
import Transaction from "./components/TransactionHistory";
import TransactionSuccess from "./components/PaymentSuccess";
import RulesPage from "./pages/rules";
import Staff from "./components/Staff";
import AlumniPage from "./pages/Alumni";
import DisclosurePage from "./pages/disclosure";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AnimatedRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return loading ? (
    <Preloader />
  ) : (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about_school" element={<About />} />
      <Route path="/principal_message" element={<PrincipalMessage />} />
      <Route path="/rules-&-regulations" element={<RulesPage />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/alumni" element={<AlumniPage />} />
      <Route path="/download" element={<Download />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/course" element={<Course />} />
      <Route path="/public-disclosure" element={<DisclosurePage />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/application" element={<Application />} />
      <Route path="/terms&conditions" element={<TermsConditions />} />
      <Route path="/privacy&policy" element={<PrivacyPolicy />} />
      <Route path="/refundpolicy" element={<RefundPolicy />} />
      <Route path="/pricingpolicy" element={<PricingPolicy />} />
      <Route path="/shipping&delivery" element={<ShippingDelivery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Menu><StudentsPage /></Menu>} />
      <Route path="/examination" element={<Menu><Examination /></Menu>} />
      <Route path="/fees" element={<Menu><Fees /></Menu>} />
      <Route path="/curriculums" element={<Menu><Curriculums /></Menu>} />
      <Route path="/school_fee" element={<Menu><SchoolFees /></Menu>} />
      <Route path="/hostel_fee" element={<Menu><Hostel /></Menu>} />
      <Route path="/transport_fee" element={<Menu><TransportFee /></Menu>} />
      <Route path="/time_table" element={<Menu><TimeTables /></Menu>} />
      <Route path="/profile_info" element={<Menu><ProfileInfo /></Menu>} />
      <Route path="/transaction_history" element={<Menu><Transaction /></Menu>} />
      <Route path="/transaction_success" element={<Menu><TransactionSuccess /></Menu>} />
    </Routes>
  );
};

function App() {
  const hideLayoutPaths = [  
    "/dashboard",
    "/examination",
    "/fees",
    "/curriculums",
    "/login",
    "/school_fee",
    "/hostel_fee",
    "/transport_fee",
    "/time_table",
    "/profile_info",
    "/transaction_history",
    "/transaction_success"
  ];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

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
