import React, { useContext } from "react";
import { Link } from "react-scroll";
import { MyResumeContext } from "../context/MyResumeContext";

const QUICK_LINKS = [
  { name: "Home", to: "home" },
  { name: "About", to: "about" },
  { name: "Skills", to: "techstack" },
  { name: "Projects", to: "projects" },
  { name: "Experience", to: "experience" },
  { name: "YouTube", to: "youtube" },
  { name: "Contact", to: "contact" },
];

const Footer = () => {
  const { profileData } = useContext(MyResumeContext);
  const { personalInfo } = profileData;

  const socialLinks = [
    { icon: "fa-linkedin", href: personalInfo.linkedin || "https://www.linkedin.com/in/manikandanarumugam001" },
    { icon: "fa-github",   href: personalInfo.github   || "https://github.com/manikeeranur" },
    { icon: "fa-envelope-o", href: `mailto:${personalInfo.email || "manikeeranur2105@gmail.com"}` },
  ];

  return (
    <footer className="site-footer">
      <div className="home-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">{personalInfo.name || "Manikandan Arumugam"}</div>
            <p className="footer-tagline">
              Frontend Developer crafting modern web experiences with clean code and great design.
            </p>
            <div className="footer-social-row">
              {socialLinks.map((s) => (
                <a key={s.icon} href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                  <i className={`fa ${s.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} smooth duration={400} offset={-80} className="footer-link">
                {l.name}
              </Link>
            ))}
          </div>

          <div>
            <div className="footer-col-title">Resources</div>
            <a className="footer-link" href="/myresume" target="_blank" rel="noreferrer">Resume</a>
            <a className="footer-link" href={personalInfo.github || "https://github.com/manikeeranur"} target="_blank" rel="noreferrer">GitHub</a>
            <a className="footer-link" href={personalInfo.linkedin || "https://www.linkedin.com/in/manikandanarumugam001"} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="footer-link" href="https://blog.manikandan.site/" target="_blank" rel="noreferrer">Blog</a>
          </div>

          <div>
            <div className="footer-col-title">Get In Touch</div>
            <div className="footer-contact-line"><i className="fa fa-envelope-o" aria-hidden="true" /> {personalInfo.email}</div>
            <div className="footer-contact-line"><i className="fa fa-phone" aria-hidden="true" /> {personalInfo.phone}</div>
            <div className="footer-contact-line"><i className="fa fa-map-marker" aria-hidden="true" /> {personalInfo.location}</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {personalInfo.name || "Manikandan Arumugam"}. All rights reserved.</span>
          <span>Built with ❤️ using React.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
