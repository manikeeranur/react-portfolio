import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import { useMediaQuery } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const Education = () => {
  const { educationDetails } = useContext(MyResumeContext);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className="education">
      <div className="container">
        <div className="heading-top">Education</div>

        <div className="col-12 col-lg-9">
          <Timeline position={isMobile ? "right" : "alternate"}>
            {educationDetails.map((education, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot variant="filled" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div className={`education-card education-card${index + 1}`}>
                    <div className="education-degree">
                      <span className="fw-bold">{education.degree}</span>
                      <span className="ms-2">{education.percentage}</span>
                    </div>
                    <small className="text-secondary">
                      {education.institute}
                    </small>
                    <div>
                      <small className="education-year fw-bold">
                        {education.year}
                      </small>
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default Education;
