import React from "react";
import Marquee from "react-fast-marquee";
import html from "../../Images/skills/html.svg";
import css from "../../Images/skills/css.svg";
import bootstrap from "../../Images/skills/bootstrap.svg";
import materialui from "../../Images/skills/materialui.svg";
import scss from "../../Images/skills/scss.svg";
import javascript from "../../Images/skills/javascript.svg";
import reactjs from "../../Images/skills/reactjs.svg";
import nextjs from "../../Images/skills/nextjs.svg";
import vscode from "../../Images/skills/vscode.svg";
import jira from "../../Images/skills/jira.svg";
import aws from "../../Images/skills/aws.svg";
import git from "../../Images/skills/git.svg";

const Skills = () => {
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
      image: scss,
      text: "Scss",
    },
    {
      image: materialui,
      text: "MUI",
    },
    {
      image: javascript,
      text: "JavaScript",
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
      text: "VS Code",
    },
    {
      image: git,
      text: "Git",
    },

    {
      image: jira,
      text: "Jira",
    },

    {
      image: aws,
      text: "AWS (S3)",
    },
  ];

  const skillsCards = (startIndex, endIndex) => {
    return (
      <div className="skills-group">
        {skills.slice(startIndex, endIndex).map((skill, index) => (
          <div className="skills-box col" key={index}>
            <img src={skill.image} alt="skills" width="35px" />
            <div className="ms-3">{skill.text}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="overflow-hidden skills" id="skills">
        <div className="container">
          <div className="heading-top">Techs Used</div>

          <div className="skill-heading"> Frontend Technologies</div>
          {skillsCards(0, 4)}
          <div className="mt-3 mt-md-4">{skillsCards(4, 8)}</div>
          <div className="skill-heading"> Tools & Platforms</div>
          {skillsCards(8, 12)}
        </div>
      </div>
    </>
  );
};

export default Skills;
