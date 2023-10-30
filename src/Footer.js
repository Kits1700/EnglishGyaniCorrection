import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div class="footer-links"></div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <div className="social-logo">
              <a className="social-logo">
                <div>SPIRE Lab</div>
              </a>
            </div>
          </div>

          <div class="social-icons"></div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
