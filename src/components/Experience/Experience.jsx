import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import programmer1 from "../../Images/storyset/programmer1.png";
import programmer2 from "../../Images/storyset/programmer2.png";
import programmer3 from "../../Images/storyset/programmer3.png";
import { motion } from "framer-motion";
const Experience = () => {
  const { ExperienceDetails } = useContext(MyResumeContext);

  const cardVariants1 = {
    offscreen: {
      x: 1000,
    },
    onscreen: {
      x: 0,
      transition: {
        x: {
          duration: 1,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };
  const cardVariants2 = {
    offscreen: {
      x: -1500,
    },
    onscreen: {
      x: 0,
      transition: {
        x: {
          delay: 0.5,
          duration: 1,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  function experienceSystemCard(image, currentIndex, nextIndex) {
    return (
      <div
        className={`experience-system ${`experience-system${
          currentIndex + 1
        }`}`}
      >
        <div className="col-12 col-lg-4">
          <img src={image} alt="" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-8 ps-lg-5">
          {ExperienceDetails.slice(currentIndex, nextIndex).map(
            (exp, index) => (
              <div className="mb-4" key={index}>
                <div className="experience-details">
                  <div className="col">
                    <div className="role display-5 fw-bold mb-1">
                      {exp.role}
                    </div>
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
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="experience pt-3">
        <div className="container overflow-hidden">
          <div className="heading-top">Experience</div>
          <motion.div
            transition={{ duration: 1 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants1}>
              {experienceSystemCard(programmer1, 0, 1)}
            </motion.div>
          </motion.div>

          <motion.div
            transition={{ duration: 1 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants2}>
              {experienceSystemCard(programmer2, 1, 2)}
            </motion.div>
          </motion.div>

          <motion.div
            transition={{ duration: 1 }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
          >
            <motion.div variants={cardVariants1}>
              {experienceSystemCard(programmer3, 2, 3)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Experience;
