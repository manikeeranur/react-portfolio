import React from "react";

const Footer = () => (
  <footer
    style={{
      background: "#080f1e",
      padding: "20px 16px",
      textAlign: "center",
      color: "#64748b",
      fontSize: "13px",
    }}
  >
    <span style={{ color: "#94a3b8" }}>
      © {new Date().getFullYear()} Manikandan A. All rights reserved.
    </span>
    <span style={{ margin: "0 10px", opacity: 0.3 }}>|</span>
    <span>Built with React &amp; ❤️</span>
  </footer>
);

export default Footer;
