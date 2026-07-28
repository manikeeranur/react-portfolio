// Shared icon lookup for skill/tech names, used by Skills.jsx and TechStack.jsx.
// All SVGs served from public/images/skills/ — no webpack import needed.
export const ICON_MAP = {
  "html":              "/images/skills/html.svg",
  "html5":             "/images/skills/html.svg",
  "html / css":        "/images/skills/html.svg",
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
  "typescript":        "/images/skills/typescript.svg",
  "ts":                "/images/skills/typescript.svg",
  "tailwind css":      "/images/skills/tailwind.svg",
  "tailwindcss":       "/images/skills/tailwind.svg",
  "tailwind":          "/images/skills/tailwind.svg",
  "redux":             "/images/skills/redux.svg",
  "postman":           "/images/skills/postman.svg",
};

// Branded colors for techs without a public SVG
export const LETTER_COLORS = {
  "bitbucket":       "#0052CC",
  "jenkins":         "#D33833",
  "chrome devtools": "#4285F4",
  "shadcn":          "#18181B",
  "context api":     "#61DAFB",
};

// Short labels for techs without a public SVG, so lookalike names (e.g.
// TypeScript vs Tailwind CSS) don't both collapse to the same single letter.
const SHORT_LABELS = {
  "bitbucket":    "Bb",
  "jenkins":      "Jk",
  "context api":  "Cx",
  "shadcn":       "Sh",
};

export const getTechIcon = (name, image) => image || ICON_MAP[name.toLowerCase()] || null;

export const LetterBadge = ({ name, size = 32 }) => {
  const key = name.toLowerCase();
  const bg = LETTER_COLORS[key] || "#8b5cf6";
  const label = SHORT_LABELS[key] || name[0].toUpperCase();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 6,
        background: bg,
        color: "#fff",
        fontWeight: 800,
        fontSize: label.length > 1 ? size * 0.34 : size * 0.44,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
};
