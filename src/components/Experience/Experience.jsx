import React, { useContext } from "react";
import { motion } from "framer-motion";
import { MyResumeContext } from "../context/MyResumeContext";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Experience = () => {
  const { ExperienceDetails } = useContext(MyResumeContext);
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <>
      <div className="experience pt-3" id="experience" ref={ref}>
        <div className="container overflow-hidden">
          <div className="heading-top">Experience</div>

          <div className="d-flex flex-wrap gap-3">
            {ExperienceDetails.slice(0, 2).map((exp, index) => (
              <motion.div
                className="col-md col-12"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.55, delay: index * 0.2 }}
              >
                <div className="experience-details flex-column col-12">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
