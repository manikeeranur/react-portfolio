import React, { useState } from "react";
import { motion } from "framer-motion";

import html from "../../Images/skills/html.svg";
import css from "../../Images/skills/css.svg";
import bootstrap from "../../Images/skills/bootstrap.svg";
import materialui from "../../Images/skills/materialui.svg";
import scss from "../../Images/skills/scss.svg";
import javascript from "../../Images/skills/javascript.svg";
import jquery from "../../Images/skills/jquery.svg";
import reactjs from "../../Images/skills/reactjs.svg";
import nextjs from "../../Images/skills/nextjs.svg";
import github from "../../Images/skills/github.svg";
import vscode from "../../Images/skills/vscode.svg";
import jira from "../../Images/skills/jira.svg";
import figma from "../../Images/skills/figma.svg";
import photoshop from "../../Images/skills/photoshop.svg";
import aws from "../../Images/skills/aws.svg";
import git from "../../Images/skills/git.svg";

const Skills = () => {
  // const cardVariants1 = {
  //   offscreen: {
  //     y: -1500,
  //   },
  //   onscreen: {
  //     y: 0,
  //     transition: {
  //       y: {
  //         duration: 1,
  //         repeatType: "reverse",
  //         ease: "easeInOut",
  //       },
  //     },
  //   },
  // };
  // const cardVariants2 = {
  //   offscreen: {
  //     y: 1500,
  //   },
  //   onscreen: {
  //     y: 0,
  //     transition: {
  //       y: {
  //         duration: 1,
  //         repeatType: "reverse",
  //         ease: "easeInOut",
  //       },
  //     },
  //   },
  // };

  const skills = [
    {
      image: html,
      text: "HTML",
    },
    {
      image: css,
      text: "CSS",
    },
    {
      image: bootstrap,
      text: "Bootstrap",
    },
    {
      image: materialui,
      text: "MUI",
    },
    {
      image: scss,
      text: "Sass",
    },
    {
      image: javascript,
      text: "JavaScript",
    },
    {
      image: jquery,
      text: "jQuery",
    },
    {
      image: reactjs,
      text: "React Js",
    },
    {
      image: nextjs,
      text: "Next Js",
    },
    {
      image: vscode,
      text: "VsCode",
    },
    {
      image: git,
      text: "Git",
    },

    // {
    //   image: github,
    //   text: "GitHub",
    // },

    {
      image: jira,
      text: "Jira",
    },

    {
      image: aws,
      text: "Aws (S3)",
    },
    {
      image: figma,
      text: "Figma",
    },

    {
      image: photoshop,
      text: "Photoshop",
    },
  ];

  const skillsCards = (startIndex, endIndex) => {
    return (
      <div className="skills-group">
        {skills.slice(startIndex, endIndex).map((skill, index) => (
          <div className="skills-box col" key={index}>
            <img src={skill.image} alt="skills" width="35px" />
            <div className="text-white ms-3">{skill.text}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-hidden skills">
      <div className="container">
        <div className="heading-top">Techs Used</div>

        {/* <motion.div
          transition={{ duration: 1 }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants1}>
            <div className="m-0 row justify-content-center gap-md-4 mb-md-5">
              {skills.slice(0, 5).map((skill) => (
                <div className="p-0 col-6 col-md-2">
                  <div className="m-2 rounded skills-box">
                    <img
                      src={`${skillsBaseURL}${skill.image}`}
                      alt="skills"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-center fw-bold">{skill.text}</div>
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
            <div className="m-0 row justify-content-center gap-md-4">
              {skills.slice(5, 10).map((skill) => (
                <div className="p-0 col-6 col-md-2">
                  <div className="m-2 rounded skills-box">
                    <img
                      src={`${skillsBaseURL}${skill.image}`}
                      alt="HTML LOGO"
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-center fw-bold">{skill.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div> */}

        {/* <div className="skills-group">
          {skills.map((skill) => (
            <div className="skills-box">
              <img src={`${skill.image}`} alt="skills" width="40px" />
              <div className="text-white ms-3">{skill.text}</div>
            </div>
          ))}
        </div> */}
        <div className="skill-heading">UI</div>
        {skillsCards(0, 5)}
        <div className="skill-heading">UX</div>
        {skillsCards(13, 15)}

        <div className="skill-heading">Frontend</div>
        {skillsCards(5, 9)}
        <div className="skill-heading">Others</div>
        {skillsCards(9, 13)}
      </div>
    </div>
  );
};

export default Skills;
