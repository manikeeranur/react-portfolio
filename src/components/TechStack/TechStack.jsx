import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import SectionHeader from "../common/SectionHeader";
import Carousel from "../common/Carousel";
import { getTechIcon, LetterBadge } from "../common/techIcons";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const STATIC_TECHS = [
  { id: "s01", name: "HTML" },
  { id: "s02", name: "CSS" },
  { id: "s03", name: "JavaScript" },
  { id: "s04", name: "TypeScript" },
  { id: "s05", name: "React Js" },
  { id: "s06", name: "Next Js" },
  { id: "s07", name: "Bootstrap" },
  { id: "s08", name: "Git" },
  { id: "s09", name: "GitHub" },
  { id: "s10", name: "VS Code" },
  { id: "s11", name: "Figma" },
];

const TechStack = () => {
  const { profileData } = useContext(MyResumeContext);
  const techs = profileData.techs?.length > 0 ? profileData.techs : STATIC_TECHS;
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div className="section-card" id="techstack" ref={ref}>
      <div className="home-container">
        <SectionHeader number="02" title="Tech Stack" />
        <div className={`skills-reveal ${isVisible ? "is-visible" : ""}`}>
          <Carousel
            items={techs}
            keyField="name"
            perView={{ base: 2, md: 6 }}
            gap={16}
            renderItem={(tech) => {
              const icon = getTechIcon(tech.name, tech.image);
              return (
                <div className="tech-box">
                  {icon ? (
                    <img src={icon} alt={tech.name} width="30" height="30" />
                  ) : (
                    <LetterBadge name={tech.name} />
                  )}
                  <span>{tech.name}</span>
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechStack;
