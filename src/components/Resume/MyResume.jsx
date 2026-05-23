import React, { useContext } from "react";
import "./resumeview.css";
import { MyResumeContext } from "../context/MyResumeContext";
import WorkExperience from "./WorkExperience";

const staticProfile = "/images/profile/resume-image.jpeg";
const MyResume = () => {
  const {
    profileData,
    contactDetails,
    gitHubLinks,
    ExperienceDetails,
    technicalSkills,
    educationDetails,
    strength,
    personalDetails,
  } = useContext(MyResumeContext);

  const { personalInfo, profileImage } = profileData;
  const displayName  = personalInfo.name  || "Manikandan A";
  const displayTitle = personalInfo.title || "Front-End Developer";
  const displayImg   = profileImage || staticProfile;

  // Calculate total experience from earliest start date
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - startYear;

  return (
    <div className="my-resume">
      <div className="container-resume" id="resume-content">
        <div className="header">
          <div className="header-left">
            <div className="profile">
              <img
                src={displayImg}
                alt={displayName}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
          </div>
          <div className="header-right">
            <h1 className="name">{displayName}</h1>
            <h3 className="address1">{displayTitle}</h3>
            <div className="address2">
              <WorkExperience startDate="2021-08-2" /> of Professional relevant
              experience.
            </div>
            <div className="address3">
              {personalInfo.bio
                ? personalInfo.bio
                : "I have earned considerable exposure by Providing IT Services in developing web applications."}
            </div>
          </div>
        </div>

        <div className="contactdetails">
          {contactDetails.slice(0, 4).map((contact, i) => (
            <div key={i}>
              <i className={`fa ${contact.icon}`} aria-hidden="true"></i>
              <span>{contact.details}</span>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="left">
            {/* Work Experience */}
            <div className="experiance">
              <p className="title">WORK EXPERIENCE</p>
              {ExperienceDetails.map((exp, i) => (
                <div className="mb-3" key={i}>
                  <div className="experience-details">
                    <div>
                      <i className="fa fa-caret-right" aria-hidden="true"></i>
                    </div>
                    <div className="col ms-3">
                      <div className="Role mb-1">{exp.role}</div>
                      <div className="companyName">{exp.companyName}</div>
                      <div className="institute">{exp.experience}</div>
                      <div className="institute">Technology : {exp.technology}</div>
                      {exp.project ? (
                        <div className="d-flex">
                          <div className="companyName me-2 fw-bold">Project : </div>
                          <div className="institute">{exp.project} {exp.client}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Details */}
            <div className="experiance">
              <p className="title">Project Details</p>
              {ExperienceDetails.map((exp, i) => (
                <React.Fragment key={i}>
                  {exp.project ? (
                    <div className="fw-bold mt-3">
                      {exp.project} {exp.client}
                    </div>
                  ) : null}
                  {exp.projectDescription?.map((desc, j) => (
                    <div className="experience-details mt-1" key={j}>
                      <p className="mb-0">
                        <i className="fa fa-circle hidden" aria-hidden="true" style={{ fontSize: "6px" }}></i>
                      </p>
                      <div className="mb-0 col ms-3">{desc}</div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="right">
            {/* Technical Skills */}
            <div className="technicalskills">
              <p className="title">TECHNICAL SKILLS</p>
              {technicalSkills.map((skill, i) => (
                <div className="skills_box" key={i}>
                  <p><i className="fa fa-caret-right" aria-hidden="true"></i></p>
                  <p>{skill.title}</p>
                  <p>:</p>
                  <p>{skill.value}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="education">
              <p className="title">education</p>
              {educationDetails.map((ed, i) => (
                <div className="education_box" key={i}>
                  <div className="education-left">
                    <div className="bold" id="pg">
                      {ed.degree} {ed.percentage}
                    </div>
                    <p className="institute">{ed.institute}</p>
                  </div>
                  <div className="education-right bold">{ed.year}</div>
                </div>
              ))}
            </div>

            {/* Strength */}
            <div className="strength">
              <p className="title">Strength</p>
              {strength.map((s, i) => (
                <div className="mt-2" key={i}>
                  <i className="fa fa-caret-right" aria-hidden="true" style={{ width: "4%" }}></i>
                  {s}
                </div>
              ))}
            </div>

            {/* Personal Details */}
            <div className="personal-details">
              <p className="title">Personal Details</p>
              {personalDetails.map((d, i) => (
                <div className="skills_box" key={i}>
                  <p><i className="fa fa-caret-right" aria-hidden="true"></i></p>
                  <p>{d.title}</p>
                  <p>:</p>
                  <p>{d.value}</p>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="github-links">
              <p className="title">Links</p>
              {gitHubLinks.map((link, i) => (
                <div className="d-flex" key={i}>
                  <p className="mb-2"><i className="fa fa-caret-right" aria-hidden="true"></i></p>
                  <p className="mb-2">{link}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Declaration">
          <p className="title">Declaration</p>
          <p className="content">
            I hereby declare that the above mentioned information is true to the best of my
            knowledge and I bear the responsibility for the comments of the above mentioned
            particulars.
          </p>
        </div>
        <div className="sign">
          <div><p>Date:</p></div>
          <div>
            <p>( {displayName.toUpperCase()} )</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResume;
