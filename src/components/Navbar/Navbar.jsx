import React from "react";
import Profile from "../../Images/Profile/manikandan.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={Profile} alt="" width={40} className="rounded-circle" />
            <small className="ms-2">Manikandan Arumugam</small>
          </a>
          <button
            className="navbar-toggler d-lg-none"
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
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/education" className="nav-link">
                  Education
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/experience" className="nav-link">
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/skills" className="nav-link">
                  Skills
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myresume" className="nav-link">
                  My Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
