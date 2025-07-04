import React from "react";
import "../styles/Components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <div className="social-media">
          <img src="/logo.png" alt="ShiftX" className="footer-logo" />
          <p>Follow us on social media</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="app-download">
          <h3>Apply on the go</h3>
          <p>Get real-time job updates on our app</p>
          <img src="/qr-code.png" alt="" className="qr-code" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
               alt="Google Play Store" className="playstore-badge" />
        </div>
      </div>

      <div className="copyright">
        <p>© 2025 ShiftX | All rights reserved</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a></p>
      </div>
    </footer>
  );
};

export default Footer;
