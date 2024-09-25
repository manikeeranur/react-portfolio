import React, { useContext } from "react";
import "./resumeview.css";
import WorkExperience from "./WorkExperience";
import { MyResumeContext } from "../context/MyResumeContext";

const MyResume = () => {
  const {
    contactDetails,
    gitHubLinks,
    ExperienceDetails,
    technicalSkills,
    educationDetails,
    strength,
    personalDetails,
    downloadResumeAsPDF,
  } = useContext(MyResumeContext);

  return (
    <div className="my-resume">
      <div className="container-resume" id="resume-content">
        <div className="header">
          <div className="header-left">
            <div className="profile"></div>
          </div>
          <div className="header-right">
            <h1 className="name">Manikandan A </h1>
            <h3 className="address1">Front-End Developer</h3>
            <div className="address2">
              <WorkExperience startDate="2021-08-2" /> of Professional relevant
              experience.
            </div>
            <div className="address3">
              I have earned considerable exposure by Providing IT Services in
              developing web applications.
            </div>
          </div>
        </div>
        <div className="contactdetails">
          {contactDetails.map((contact) => (
            <div>
              <i className={`fa ${contact.icon}`} aria-hidden="true"></i>
              <span>{contact.details}</span>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="left">
            <div className="experiance">
              <p className="title">WORK EXPERIENCE</p>
              {ExperienceDetails.map((exp) => (
                <div className="mb-3">
                  <div className="experience-details">
                    <div>
                      <i className="fa fa-caret-right" aria-hidden="true"></i>
                    </div>
                    <div className="col ms-3">
                      <div className="Role mb-1">{exp.role}</div>

                      <div className="companyName">{exp.companyName}</div>
                      <div className="institute">{exp.experience}</div>
                      <div className="institute">
                        Technology : {exp.technology}
                      </div>
                      {exp.project ? (
                        <div className="d-flex">
                          <div className="companyName me-2">Project : </div>
                          <div className="institute">
                            {exp.project} {exp.client}
                          </div>
                        </div>
                      ) : null}
                      {/* {exp.project ? (
                        <>
                          <div className="project-title">Project Details</div>
                          <div className="fw-bold">
                            {exp.project} {exp.client}
                          </div>
                        </>
                      ) : null}

                      {exp.projectDescription ? (
                        <>
                          {exp.projectDescription.map((desc) => (
                            <div className="experience-details mt-2">
                              <p className="mb-0">
                                <i
                                  className="fa fa-caret-right hidden"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <div className="mb-0 col ms-3 ">{desc}</div>
                            </div>
                          ))}
                        </>
                      ) : null} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="experiance">
              <p className="title">Project Details</p>
              <div>
                {ExperienceDetails.map((exp) => (
                  <>
                    {exp.project ? (
                      <>
                        <div className="fw-bold mt-3">
                          {exp.project} {exp.client}
                        </div>
                      </>
                    ) : null}

                    {exp.projectDescription ? (
                      <>
                        {exp.projectDescription.map((desc) => (
                          <div className="experience-details mt-2">
                            <p className="mb-0">
                              <i
                                className="fa fa-caret-right hidden"
                                aria-hidden="true"
                              ></i>
                            </p>
                            <div className="mb-0 col ms-3 ">{desc}</div>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="technicalskills">
              <p className="title">TECHINICAL SKILLS</p>
              {technicalSkills.map((skills) => (
                <div className="skills_box">
                  <p>
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </p>
                  <p>{skills.title}</p>
                  <p>:</p>
                  <p>{skills.value}</p>
                </div>
              ))}
            </div>

            <div className="education">
              <p className="title">education</p>
              {educationDetails.map((education) => (
                <div className="education_box">
                  <div className="education-left">
                    <div className="bold" id="pg">
                      {education.degree} {education.percentage}
                    </div>
                    <p className="institute">{education.institute}</p>
                  </div>
                  <div className="education-right bold">{education.year}</div>
                </div>
              ))}
            </div>

            <div className="strength">
              <p className="title">Strength</p>
              {strength.map((data) => (
                <div className="mt-2">
                  <i
                    className="fa fa-caret-right"
                    aria-hidden="true"
                    style={{ width: "5%" }}
                  ></i>
                  {data}
                </div>
              ))}
            </div>

            <div className="personal-details">
              <p className="title">Personal Details</p>
              {personalDetails.map((details) => (
                <div className="skills_box">
                  <p>
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </p>
                  <p>{details.title}</p>
                  <p>:</p>
                  <p>{details.value}</p>
                </div>
              ))}
            </div>

            <div className="github-links">
              <p className="title">GitHub Links</p>
              {gitHubLinks.map((github) => (
                <div className="d-flex">
                  <p className="mb-2">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </p>
                  <p className="mb-2">{github}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="Declaration">
          <p class="title">Declaration</p>
          <p class="content">
            I hereby declare that the above mentioned information is true to
            best of my knowledge and I bear the responsibility for the comments
            of the above mentioned particulars.
          </p>
        </div>
        <div class="sign">
          <div>
            <p>Date:</p>
            <p>Place:</p>
          </div>
          <div>
            <p>( A.MANIKANDAN )</p>
          </div>
        </div>
      </div>

      <a class="fixed-top m-5 py-5" onClick={downloadResumeAsPDF}>
        <button class="btn btn-sm btn-primary">Download</button>
      </a>
    </div>
  );
};

export default MyResume;
