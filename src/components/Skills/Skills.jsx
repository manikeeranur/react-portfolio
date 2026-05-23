import React, { useContext } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { MyResumeContext } from "../context/MyResumeContext";

// All SVGs served from public/images/skills/ — no webpack import needed
const ICON_MAP = {
  "html":              "/images/skills/html.svg",
  "html5":             "/images/skills/html.svg",
  "css":               "/images/skills/css.svg",
  "css3":              "/images/skills/css.svg",
  "bootstrap":         "/images/skills/bootstrap.svg",
  "scss":              "/images/skills/scss.svg",
  "sass":              "/images/skills/scss.svg",
  "mui":               "/images/skills/materialui.svg",
  "material ui":       "/images/skills/materialui.svg",
  "material-ui":       "/images/skills/materialui.svg",
  "materialui":        "/images/skills/materialui.svg",
  "material ui (mui)": "/images/skills/materialui.svg",
  "javascript":        "/images/skills/javascript.svg",
  "js":                "/images/skills/javascript.svg",
  "react js":          "/images/skills/reactjs.svg",
  "react.js":          "/images/skills/reactjs.svg",
  "reactjs":           "/images/skills/reactjs.svg",
  "react":             "/images/skills/reactjs.svg",
  "next js":           "/images/skills/nextjs.svg",
  "next.js":           "/images/skills/nextjs.svg",
  "nextjs":            "/images/skills/nextjs.svg",
  "next":              "/images/skills/nextjs.svg",
  "vs code":           "/images/skills/vscode.svg",
  "vscode":            "/images/skills/vscode.svg",
  "git":               "/images/skills/git.svg",
  "github":            "/images/skills/github.svg",
  "jira":              "/images/skills/jira.svg",
  "aws":               "/images/skills/aws.svg",
  "aws s3":            "/images/skills/aws.svg",
  "aws (s3)":          "/images/skills/aws.svg",
  "figma":             "/images/skills/figma.svg",
  "jquery":            "/images/skills/jquery.svg",
};

// Branded colors for techs without a public SVG
const LETTER_COLORS = {
  "typescript":      "#3178C6",
  "tailwind css":    "#38BDF8",
  "tailwindcss":     "#38BDF8",
  "redux":           "#764ABC",
  "postman":         "#FF6C37",
  "bitbucket":       "#0052CC",
  "jenkins":         "#D33833",
  "chrome devtools": "#4285F4",
  "shadcn":          "#18181B",
  "context api":     "#61DAFB",
};

const LetterBadge = ({ name }) => {
  const bg = LETTER_COLORS[name.toLowerCase()] || "#8b5cf6";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 32, height: 32, borderRadius: 6,
      background: bg, color: "#fff",
      fontWeight: 800, fontSize: 14, flexShrink: 0,
    }}>
      {name[0].toUpperCase()}
    </span>
  );
};

const STATIC_TECHS = [
  { id: "s01", name: "HTML",       category: "Frontend Technologies" },
  { id: "s02", name: "CSS",        category: "Frontend Technologies" },
  { id: "s03", name: "JavaScript", category: "Frontend Technologies" },
  { id: "s04", name: "React Js",   category: "Frontend Technologies" },
  { id: "s05", name: "Next Js",    category: "Frontend Technologies" },
  { id: "s06", name: "Bootstrap",  category: "Frontend Technologies" },
  { id: "s07", name: "SCSS",       category: "Frontend Technologies" },
  { id: "s08", name: "MUI",        category: "Frontend Technologies" },
  { id: "s09", name: "VS Code",    category: "Tools & Platforms" },
  { id: "s10", name: "Git",        category: "Tools & Platforms" },
  { id: "s11", name: "Jira",       category: "Tools & Platforms" },
  { id: "s12", name: "AWS S3",     category: "Tools & Platforms" },
];

const Skills = () => {
  const { profileData } = useContext(MyResumeContext);
  const techs = profileData.techs?.length > 0 ? profileData.techs : STATIC_TECHS;

  const [ref, isVisible] = useScrollAnimation(0.1);

  const grouped = techs.reduce((acc, t) => {
    const cat = t.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(t);
    return acc;
  }, {});

  const directions = ["left", "right", "top", "bottom"];
  let _i = 0;
  const groupedEntries = Object.entries(grouped).map(([cat, items]) => ({
    cat,
    items: items.map(t => ({ ...t, _idx: _i++ })),
  }));

  const renderBox = (tech) => {
    // Priority: custom uploaded/path image → ICON_MAP → LetterBadge
    const icon = tech.image || ICON_MAP[tech.name.toLowerCase()] || null;
    const dir = directions[tech._idx % 4];
    const initial =
      dir === "left"   ? { opacity: 0, x: -60 } :
      dir === "right"  ? { opacity: 0, x:  60 } :
      dir === "top"    ? { opacity: 0, y: -60 } :
                         { opacity: 0, y:  60 };
    return (
      <motion.div
        className="skills-box col"
        key={tech.id || tech.name}
        initial={initial}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : initial}
        transition={{ duration: 0.5, delay: tech._idx * 0.05, ease: "easeOut" }}
        whileHover={{ scale: 1.06, y: -4 }}
      >
        {icon
          ? <img src={icon} alt={tech.name} width="32" height="32" style={{ objectFit: "contain" }} />
          : <LetterBadge name={tech.name} />
        }
        <div className="ms-3" style={{ fontSize: 13 }}>{tech.name}</div>
      </motion.div>
    );
  };

  return (
    <div className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="heading-top">Techs Used</div>

        {groupedEntries.map(({ cat, items }) => (
          <div key={cat}>
            <div className="skill-heading">{cat}</div>
            <div className="skills-group">
              {items.map(tech => renderBox(tech))}
            </div>
          </div>
        ))}

        {techs.length === 0 && (
          <p style={{ color: "var(--text-secondary)", textAlign: "center", marginTop: "2rem" }}>
            No techs added yet — add them in the Profile Manager.
          </p>
        )}
      </div>
    </div>
  );
};

export default Skills;
