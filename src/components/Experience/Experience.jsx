import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";

const Experience = () => {
  const { ExperienceDetails } = useContext(MyResumeContext);

  return (
    <>
      <div className="experience pt-3" id="experience">
        <div className="container overflow-hidden">
          <div className="heading-top">Experience</div>

          <div className="d-flex flex-wrap gap-3">
            {ExperienceDetails.slice(0, 2).map((exp, index) => (
              <div className="col-md col-12">
                <div
                  className="experience-details flex-column col-12"
                  key={index}
                >
                  <div className="d-flex justify-content-between">
                    <div className="role">{exp.role}</div>
                    <div className="institute">{exp.experience}</div>
                  </div>
                  <div>{exp.companyName}</div>

                  <div className="mt-3 fw-bold">Technology :</div>
                  <div>{exp.technology}</div>
                  {exp.project ? (
                    <div className="mt-3">
                      <div className="fw-bold">Project : </div>
                      <div>
                        {exp.project} {exp.client}
                      </div>
                    </div>
                  ) : null}
                  {/* <div className="col">
                    {exp.projectDescription.length ? (
                      <>
                        <div className="company-name mb-2">
                          Project Description
                        </div>
                        {exp.projectDescription.map((desc) => (
                          <div className="institute mb-2">{desc}</div>
                        ))}
                      </>
                    ) : null}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
