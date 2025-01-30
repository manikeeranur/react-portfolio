import React, { useContext } from "react";
import Resume from "../download/Manikandan_Resume.pdf";
import MyResume from "../Resume/MyResume";
import { MyResumeContext } from "../context/MyResumeContext";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const { downloadResumeAsPDF } = useContext(MyResumeContext);
  return (
    <div className="container" id="home">
      <div className="home-page pt-md-5">
        <div className="col-md">
          <p>Hi, I'm</p>
          <h2 className="myJob">Manikandan A</h2>
          <h2 className="role">Front End Developer.</h2>

          <p>
            I'm a Front End Developer based in{" "}
            <TypeAnimation
              sequence={["React", 1000, "React & Next JS.", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <a
            className="btn btn-outline-secondary download-button-new btn-sm mt-3 d-none d-md-inline"
            onClick={downloadResumeAsPDF}
          >
            Get My Resume
            <i className="fa fa-download ms-3" aria-hidden="true"></i>
          </a>
          <a
            className="btn btn-outline-secondary download-button-new btn-sm mt-3 d-d-md-inline d-md-none"
            href={Resume}
            download="Manikandan_Resume.pdf"
          >
            Get My Resume.
            <i className="fa fa-download ms-3" aria-hidden="true"></i>
          </a>
          <div className="d-none">
            <MyResume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
