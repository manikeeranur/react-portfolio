import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import education1 from "../../Images/storyset/education1.png";
import education2 from "../../Images/storyset/education2.png";

const Education = () => {
  const { educationDetails } = useContext(MyResumeContext);

  return (
    <div className="education" id="education">
      <div className="container">
        <div className="heading-top">
          Education{" "}
          <em className="fa fa-graduation-cap ms-3" aria-hidden="true"></em>
        </div>
        <div className="flex-wrap d-flex justify-content-between gap-4">
          <div className="education-system col-md-5 col-12">
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

          <div className="education-system col-md-5 col-12">
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
        </div>
      </div>
    </div>
  );
};

export default Education;
