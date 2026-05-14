import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MyResumeContext } from "../context/MyResumeContext";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Education = () => {
  const { educationDetails } = useContext(MyResumeContext);
  const [ref, isVisible] = useScrollAnimation(0.1);

  const cardProps = (index) => ({
    initial: { opacity: 0, x: -30 },
    animate: isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
    transition: { duration: 0.5, delay: index * 0.15 },
    whileHover: { x: 6 },
  });

  return (
    <div className="education" id="education" ref={ref}>
      <div className="container">
        <div className="heading-top">
          Education{" "}
          <em className="fa fa-graduation-cap ms-3" aria-hidden="true"></em>
        </div>
        <div className="flex-wrap d-flex justify-content-between gap-4">
          <div className="education-system col-md-5 col-12">
            {educationDetails.slice(0, 2).map((education, index) => (
              <motion.div
                className="education-card"
                key={index}
                {...cardProps(index)}
              >
                <div className="education-degree">
                  <span className="fw-bold">{education.degree}</span>
                  <span className="percentage">{education.percentage}</span>
                </div>
                <div className="text-secondary college">
                  {education.institute}
                </div>
                <div className="education-year fw-bold">{education.year}</div>
              </motion.div>
            ))}
          </div>

          <div className="education-system col-md-5 col-12">
            {educationDetails.slice(2, 4).map((education, index) => (
              <motion.div
                className="education-card"
                key={index}
                {...cardProps(index + 2)}
              >
                <div className="education-degree">
                  <span className="fw-bold">{education.degree}</span>
                  <span className="percentage">{education.percentage}</span>
                </div>
                <div className="text-secondary college">
                  {education.institute}
                </div>
                <div className="education-year fw-bold">{education.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
