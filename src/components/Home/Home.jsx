import React from "react";
import Resume from "../download/Manikandan_Resume.pdf";
import Profile from "../../Images/Profile/manikandan.png";

const Home = () => {
  return (
    <div className="container">
      <div className="home-page pt-md-5">
        <div className="col-md">
          <p>Hi, I'm</p>
          <h2 className="myJob">Manikandan A</h2>
          <h2 className="role">Front End Developer.</h2>
          <p>I'm a Front End Developer based in React & Next JS.</p>
          <a
            className="btn btn-outline-secondary btn-sm mt-3"
            href={Resume}
            download="Manikandan_Resume.pdf"
          >
            Get My Resume
          </a>
        </div>

        <div className="col-12 col-md-2 text-center">
          <img src={Profile} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
