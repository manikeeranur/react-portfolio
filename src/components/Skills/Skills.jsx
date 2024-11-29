import React, { useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const skillsBaseURL =
    "https://res.cloudinary.com/duuesjzan/image/upload/q_auto:low/v1732870679/skills/";
  const cardVariants1 = {
    offscreen: {
      y: -1500,
    },
    onscreen: {
      y: 0,
      transition: {
        y: {
          duration: 1,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };
  const cardVariants2 = {
    offscreen: {
      y: 1500,
    },
    onscreen: {
      y: 0,
      transition: {
        y: {
          duration: 1,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      },
    },
  };

  const [skills, setSkills] = useState([
    {
      image: "html",
      text: "HTML",
    },
    {
      image: "css",
      text: "CSS",
    },
    {
      image: "bootstrap",
      text: "Bootstrap",
    },
    {
      image: "materialui",
      text: "MUI",
    },
    {
      image: "javascript",
      text: "JavaScript",
    },
    {
      image: "jquery",
      text: "jQuery",
    },
    {
      image: "reactjs",
      text: "React Js",
    },
    {
      image: "nextjs",
      text: "Next Js",
    },

    {
      image: "github",
      text: "GitHub",
    },

    {
      image: "vscode",
      text: "VsCode",
    },
  ]);

  return (
    <div className="skills overflow-hidden">
      <div className="container">
        <div className="heading-top">Skills</div>

        <motion.div
          transition={{ duration: 1 }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants1}>
            <div className="row justify-content-center m-0 gap-md-4 mb-md-5">
              {skills.slice(0, 5).map((skill) => (
                <div className="col-6 col-md-2 p-0">
                  <div className="skills-box rounded m-2">
                    <img
                      src={`${skillsBaseURL}${skill.image}`}
                      alt="skills"
                      className="img-fluid"
                    />
                  </div>
                  <div className="fw-bold text-center">{skill.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          transition={{ duration: 1 }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants2}>
            <div className="row justify-content-center m-0 gap-md-4">
              {skills.slice(5, 10).map((skill) => (
                <div className="col-6 col-md-2 p-0">
                  <div className="skills-box rounded m-2">
                    <img
                      src={`${skillsBaseURL}${skill.image}`}
                      alt="HTML LOGO"
                      className="img-fluid"
                    />
                  </div>
                  <div className="fw-bold text-center">{skill.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
