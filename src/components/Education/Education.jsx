import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import education1 from "../../Images/storyset/education1.png";
import education2 from "../../Images/storyset/education2.png";

const Education = () => {
  const { educationDetails } = useContext(MyResumeContext);

  return (
    <div className="education">
      <div className="container">
        <div className="heading-top">Education</div>
        <div className="education-system">
          <div className="col-12 col-lg-4">
            <img src={education1} alt="" className="img-fluid" />
          </div>
          <div className="col-12 col-md-8 ps-md-5">
            {educationDetails.slice(0, 2).map((education, index) => (
              <div className="education-card">
                <div className="education-degree">
                  <span className="fw-bold">{education.degree}</span>
                  <span className="percentage">{education.percentage}</span>
                </div>
                <div className="text-secondary college">
                  {education.institute}
                </div>

                <div className="education-year fw-bold">{education.year}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="education-system">
          <div className="col-12 col-md-8">
            {educationDetails.slice(2, 4).map((education, index) => (
              <div className="education-card">
                <div className="education-degree">
                  <span className="fw-bold">{education.degree}</span>
                  <span className="percentage">{education.percentage}</span>
                </div>
                <div className="text-secondary college">
                  {education.institute}
                </div>

                <div className="education-year fw-bold">{education.year}</div>
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-4">
            <img src={education2} alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
