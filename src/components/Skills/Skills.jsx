import React, { useState } from "react";
import html from "../../Images/Skills/html.png";
import css from "../../Images/Skills/css.png";
import javascript from "../../Images/Skills/javascript.png";
import jquery from "../../Images/Skills/jquery.png";
import reactjs from "../../Images/Skills/reactjs.png";
import nextjs from "../../Images/Skills/nextjs.png";
import mui from "../../Images/Skills/materialui.png";
import bootstrap from "../../Images/Skills/bootstrap.png";
import github from "../../Images/Skills/github.png";
import vscode from "../../Images/Skills/vscode.png";
const Skills = () => {
  const [skills, setSkills] = useState([
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
      image: mui,
      text: "MUI",
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
      image: github,
      text: "GitHub",
    },

    {
      image: vscode,
      text: "VsCode",
    },
  ]);

  return (
    <div className="skills">
      <div className="container">
        <div className="heading-top">Skills</div>

        <div className="row m-0 gap-md-4">
          {skills.map((skill) => (
            <div className="col-6 col-md-2 p-0">
              <div className="skills-box rounded m-2">
                <img src={skill.image} alt="HTML LOGO" className="img-fluid" />
              </div>
              <div className="fw-bold text-center">{skill.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
