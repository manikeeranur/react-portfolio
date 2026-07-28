import React, { useContext } from "react";
import { MyResumeContext } from "../context/MyResumeContext";
import SectionHeader from "../common/SectionHeader";
import Carousel from "../common/Carousel";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, #6d5cd8, #2dd4bf)",
  "linear-gradient(135deg, #ec4899, #6d5cd8)",
  "linear-gradient(135deg, #0f172a, #6d5cd8)",
];

const ProjectCard = ({ project, index }) => {
  const tags = (project.technologies || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="project-card">
      <div className="project-thumb" style={{ background: CARD_GRADIENTS[index % CARD_GRADIENTS.length] }}>
        <span>{project.name[0]}</span>
      </div>
      <div className="project-body">
        <div className="project-title">{project.name}</div>
        <p className="project-desc">{project.description}</p>
        {tags.length > 0 && (
          <div className="project-tags">
            {tags.map((tag) => (
              <span className="project-tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
        {(project.liveUrl || project.githubUrl) && (
          <div className="project-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link">
                Live Demo <i className="fa fa-external-link" aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link">
                GitHub <i className="fa fa-external-link" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const { profileData } = useContext(MyResumeContext);
  const projects = profileData.projects || [];
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <div className="section-card" id="projects" ref={ref}>
      <div className="home-container">
        <SectionHeader number="03" title="Featured Projects" viewAllText="View all projects" viewAllTo="projects" />
        <div className={`skills-reveal ${isVisible ? "is-visible" : ""}`}>
          <Carousel
            items={projects}
            perView={{ base: 1, md: 3 }}
            gap={24}
            renderItem={(project, i) => <ProjectCard project={project} index={i} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
