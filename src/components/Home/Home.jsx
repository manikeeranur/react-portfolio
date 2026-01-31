import React, { useContext } from "react";
import Resume from "../download/Manikandan_Resume.pdf";
import MyResume from "../Resume/MyResume";
import { MyResumeContext } from "../context/MyResumeContext";
import Profile from "../../Images/Profile/manikandan_profile.jpeg";

const Home = () => {
  const { downloadResumeAsPDF } = useContext(MyResumeContext);
  return (
    <div id="home">
      <div className="container">
        <div className="home-page pt-md-5">
          <img src={Profile} className="home-profile-img d-block d-md-none" />
          <div className="col-md">
            <p>
              Hi, I'm <span className="wave">👋</span>
            </p>
            <h2 className="myJob">Manikandan A</h2>
            {/* <h2 className="role">Frontend Developer.</h2> */}
            <h2 className="role">Software Developer.</h2>

            <div className="mt-4 mt-md-5">
              {/* <a
                className="btn btn-outline-secondary download-button-new btn-sm mt-3 d-none d-md-inline"
                onClick={downloadResumeAsPDF}
              >
                Get My Resume
                <i className="fa fa-download ms-3" aria-hidden="true"></i>
              </a> */}
              <a
                className="btn btn-outline-secondary download-button-new btn-sm mt-3 d-inline"
                href={Resume}
                download="Manikandan_Resume.pdf"
              >
                Get My Resume.
                <i className="fa fa-download ms-3" aria-hidden="true"></i>
              </a>
            </div>
            <div className="d-none">
              <MyResume />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
