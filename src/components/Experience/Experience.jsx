import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MyResumeContext } from "../context/MyResumeContext";
import SectionHeader from "../common/SectionHeader";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const DOT_COLORS = ["#6d5cd8", "#ec4899", "#0ea5e9"];

const Experience = () => {
  const { ExperienceDetails } = useContext(MyResumeContext);
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div className="section-card" id="experience" ref={ref}>
      <div className="home-container">
        <SectionHeader number="04" title="Experience" viewAllText="View full experience" viewAllTo="experience" />

        <div className="timeline">
          {ExperienceDetails.map((exp, index) => (
            <motion.div
              className="timeline-item"
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <span
                className="timeline-dot"
                style={{ background: DOT_COLORS[index % DOT_COLORS.length] }}
              >
                <i className="fa fa-briefcase" aria-hidden="true" />
              </span>
              <div className="timeline-content">
                <div className="timeline-year">{exp.experience}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-company">{exp.companyName}</div>
                {exp.projectDescription[0] && (
                  <p className="timeline-desc">{exp.projectDescription[0]}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
