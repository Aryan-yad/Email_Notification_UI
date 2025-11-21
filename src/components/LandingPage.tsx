import React from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .landing-container {
          background: #e9f2ff;
          height: 100vh;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 20px 40px;
          background: white;
          border-bottom: 1px solid #e6e6e6;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          font-size: 24px;
          color: #0066ff;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 600;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-login {
          text-decoration: none;
          color: black;
          font-size: 16px;
          cursor: pointer;
        }

        .nav-btn {
          background: black;
          color: white;
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }

        /* Hero */
        .hero-section {
          text-align: center;
          margin-top: 80px;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 600;
        }

        .hero-subtitle {
          font-size: 48px;
          color: #005dff;
          font-weight: 600;
        }

        .hero-description {
          margin-top: 20px;
          font-size: 18px;
          color: #555;
        }

        .hero-buttons {
          margin-top: 35px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .btn-primary {
          background: #000b2e;
          color: white;
          padding: 12px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-secondary {
          background: white;
          border: 1px solid lightgray;
          padding: 12px 28px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }
      `}
      </style>

      <div className="landing-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-left">
            <FaBell className="logo-icon" />
            <span className="logo-text">NotifyHub</span>
          </div>


        </nav>

        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Smart Email Notifications</h1>
          <h1 className="hero-subtitle">Made Simple</h1>

          <p className="hero-description">
            Manage all your email notifications in one place.
            Stay informed without the overwhelm.
          </p>

          <div className="hero-buttons">
            {/* MAIN GET STARTED BUTTON */}
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Get Started
            </button>

            {/* MAIN SIGN IN BUTTON */}
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;