import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("activeSection");
    if (saved) setActive(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSetActive = (section) => {
    setActive(section);
    localStorage.setItem("activeSection", section);
  };

  return (
    <nav
      className={`navbar navbar-expand-md navbar-light sticky-top${scrolled ? " navbar-scrolled" : ""}`}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <div className="navbar-avatar">MA</div>
          <span className="navbar-brand-name">Manikandan Arumugam</span>
        </a>
        <button
          className="navbar-toggler d-lg-none"
          style={{ outline: "none" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto ms-md-auto me-md-0 mt-2 mt-lg-0">
            {[
              { name: "Home", to: "home", offset: -80 },
              { name: "Education", to: "education", offset: -80 },
              { name: "Experience", to: "experience", offset: -50 },
              { name: "Techs Used", to: "skills", offset: -50 },
              { name: "Contact", to: "contact", offset: -80 },
              { name: "YouTube", to: "youtube", offset: -80 },
              { name: "Projects", to: "projects", offset: -80 },
            ].map((item) => (
              <li className="nav-item" key={item.to}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={400}
                  offset={item.offset}
                  className={`nav-link ${active === item.to ? "active" : ""}`}
                  onClick={() => handleSetActive(item.to)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
