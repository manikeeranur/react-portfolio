import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MyResumeContext } from "../context/MyResumeContext";
import SectionHeader from "../common/SectionHeader";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import programmerImg from "../../Images/storyset/programmer1.png";

const CHECKLIST = [
  "Clean & Maintainable Code",
  "Responsive & Accessible UI",
  "Performance Optimized",
  "Pixel Perfect Design",
];

const About = () => {
  const { profileData } = useContext(MyResumeContext);
  const { personalInfo } = profileData;
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <div className="section-card" id="about" ref={ref}>
      <div className="home-container">
        <SectionHeader number="01" title="About Me" />

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-bio">{personalInfo.bio}</p>

            <ul className="about-checklist">
              {CHECKLIST.map((item) => (
                <li key={item}>
                  <i className="fa fa-check-circle" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="download-button-new"
              onClick={() => window.open("/myresume", "_blank")}
            >
              <i className="fa fa-download" aria-hidden="true" />
              Download Resume
            </button>
          </motion.div>

          <motion.div
            className="about-illustration"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="about-illustration-blob" />
            <span className="about-code-badge">
              <i className="fa fa-code" aria-hidden="true" />
            </span>
            <img src={programmerImg} alt="Developer illustration" />
            <span className="about-code-panel">
              <span className="about-code-panel-dots">
                <i /><i /><i />
              </span>
              <i className="about-code-line" style={{ width: "70%", background: "#6d5cd8" }} />
              <i className="about-code-line" style={{ width: "45%", background: "#2dd4bf" }} />
              <i className="about-code-line" style={{ width: "60%", background: "#ec4899" }} />
              <i className="about-code-line" style={{ width: "35%", background: "#6d5cd8" }} />
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
