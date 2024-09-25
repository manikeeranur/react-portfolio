import React, { useContext, useState } from "react";
import { MyResumeContext } from "../context/MyResumeContext";

const Experience = () => {
  const { ExperienceDetails } = useContext(MyResumeContext);
  const [expanded, setExpanded] = useState({});

  const toggleViewMore = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <>
      <div className="experience pt-3">
        <div className="container">
          {/* <div className="heading-top">Experience</div> */}

          {ExperienceDetails.map((exp, index) => (
            <div className="mb-4" key={index}>
              <div className="experience-details">
                <div className="col">
                  <div className="role display-5 fw-bold mb-1">{exp.role}</div>
                  <div className="company-name my-2">{exp.companyName}</div>
                  <div className="institute my-2">{exp.experience}</div>
                  <div className="institute my-2">
                    Technology : {exp.technology}
                  </div>
                  {exp.project ? (
                    <>
                      <div className="d-flex">
                        <div className="companyName me-2">Project : </div>
                        <div className="institute">
                          {exp.project} {exp.client}
                        </div>
                      </div>
                      {exp.projectDescription ? (
                        <div>
                          <div
                            className="view-more-toggle my-2"
                            onClick={() => toggleViewMore(index)}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {expanded[index] ? "View Less" : "View More..."}
                          </div>
                          {expanded[index] &&
                            exp.projectDescription.map((desc, descIndex) => (
                              <div
                                className="experience-details mt-2"
                                key={descIndex}
                              >
                                <p className="mb-0">
                                  <i
                                    className="fa fa-caret-right hidden"
                                    aria-hidden="true"
                                  ></i>
                                </p>
                                <div className="mb-0 col col-md-9 ms-3 ">
                                  {desc}
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
