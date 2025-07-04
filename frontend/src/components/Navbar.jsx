import "../styles/Components/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole");
  const employerId = localStorage.getItem("employerId");
  const workerId = localStorage.getItem("workerId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">ShiftX</h1>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/search-jobs">Search Jobs</Link>
          <Link to="/">Complaint-Box</Link>
          <Link to="/">Ratings</Link>
        </div>

        <div className="navbar-buttons">
          {userRole === "employer" && employerId ? (
            <>
              <Link to="/employer-home" className="employer-button">Employer Profile</Link>
              <button onClick={handleLogout} className="worker-button">Logout</button>
            </>
          ) : userRole === "worker" && workerId ? (
            <>
              <Link to={`/worker/${workerId}`} className="worker-button">Worker Profile</Link>
              <button onClick={handleLogout} className="employer-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login?role=employer" className="employer-button">Employer Login</Link>
              <Link to="/login?role=worker" className="worker-button">Worker Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
