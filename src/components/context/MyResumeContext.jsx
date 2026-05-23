import React, { createContext, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import profileSeedData from "../../data/profileSeedData";

export const ResumeContext = createContext();
export const MyResumeContext = createContext();

// ─── provider ────────────────────────────────────────────────────────────────
const MyResumeContextProvider = ({ children }) => {
  // Show seed / cached data immediately so UI never looks blank, then replace
  // with whatever GET /api/profile returns from the backend.
  const [profileData, setProfileData] = useState(() => {
    try {
      const raw = localStorage.getItem("portfolio_profile");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.personalInfo?.name) return stored;
      }
    } catch {}
    return profileSeedData;
  });

  // ── Fetch live profile from backend API on every page load ──────────────────
  useEffect(() => {
    fetch(`/api/profile?_=${Date.now()}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Profile API unavailable");
        return res.json();
      })
      .then((serverData) => {
        if (serverData?.personalInfo) {
          // Strip MongoDB metadata fields before storing
          const { _id, __v, createdAt, updatedAt, ...cleanData } = serverData;
          setProfileData(cleanData);
          localStorage.setItem("portfolio_profile", JSON.stringify(cleanData));
        }
      })
      .catch(() => {
        // API unavailable — keep using seed / localStorage cache
      });
  }, []);

  // ── Profile Manager save — waits for MongoDB confirmation ─────────────────
  // Optimistically updates state for snappy UI, reverts + returns error on failure.
  const updateProfile = async (newData) => {
    const token = localStorage.getItem("portfolio_token");
    if (!token) return { success: false, error: "Not authenticated" };

    // Optimistic update
    const previous = profileData;
    setProfileData({ ...newData });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });
      const data = await res.json();
      if (!res.ok) {
        setProfileData(previous); // revert
        return { success: false, error: data.error || "Failed to save" };
      }
      localStorage.setItem("portfolio_profile", JSON.stringify(newData));
      return { success: true };
    } catch {
      setProfileData(previous); // revert on network error
      return { success: false, error: "Network error. Could not reach the server." };
    }
  };

  // ── derived values (re-computed on every state change) ──────────────────────
  const pi      = profileData.personalInfo || {};
  const skills  = profileData.skills       || [];
  const expList = profileData.experience   || [];
  const eduList = profileData.education    || [];

  const contactDetails = [
    pi.email    && { icon: "fa-envelope-o",  title: "Email",    details: pi.email    },
    pi.phone    && { icon: "fa-mobile-phone", title: "Phone",   details: pi.phone    },
    pi.github   && { icon: "fa-github",       title: "GitHub",  details: pi.github   },
    pi.linkedin && { icon: "fa-linkedin",     title: "LinkedIn",details: pi.linkedin },
  ].filter(Boolean);

  const gitHubLinks = [
    pi.website && pi.website,
    pi.github  && pi.github,
  ].filter(Boolean).slice(0, 2);

  const ExperienceDetails = expList.map((ex) => ({
    role:        ex.position,
    companyName: ex.company,
    experience:  ex.current
      ? `${ex.startDate} – Present`
      : `${ex.startDate}${ex.endDate ? ` – ${ex.endDate}` : ""}`,
    technology:  ex.technology || "",
    project:     ex.project    || "",
    client:      "",
    projectDescription: ex.description
      ? ex.description
          .split(/\.\s+/)
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => (s.endsWith(".") ? s : `${s}.`))
      : [],
  }));

  const educationDetails = eduList.map((ed) => ({
    degree:     ed.degree,
    institute:  ed.institution,
    year:
      ed.startDate && ed.endDate
        ? `${ed.startDate} - ${ed.endDate}`
        : ed.endDate || ed.startDate || "",
    percentage: ed.grade || "",
  }));

  const technicalSkills = (() => {
    if (!skills.length) return [
      { title: "Language",                value: "JavaScript, TypeScript, HTML5, CSS3" },
      { title: "Frameworks & Libraries",  value: "React.js, Next.js" },
      { title: "State Management",        value: "Context API, Redux" },
      { title: "UI Libraries & Styling",  value: "MUI, Tailwind CSS, Bootstrap, SCSS, ShadCN" },
      { title: "Version Control & CI/CD", value: "Git, GitHub, Bitbucket, Jenkins" },
      { title: "Tools & Platforms",       value: "Postman, AWS S3, Jira" },
      { title: "Development Tools",       value: "VS Code, Chrome DevTools" },
    ];
    const hasCat = skills.some((s) => s.category);
    if (!hasCat) return [{ title: "Technical Skills", value: skills.map((s) => s.name).join(", ") }];
    const groups = {};
    skills.forEach((s) => {
      const cat = s.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s.name);
    });
    return Object.entries(groups).map(([title, names]) => ({ title, value: names.join(", ") }));
  })();

  const strength = [
    "Sincerity and Self-motivated, Self-analysis.",
    "Hard work and Dedication.",
    "Have a good communication with others.",
  ];

  const personalDetails = [
    pi.website && { title: "Portfolio", value: pi.website },
    { title: "Language Known", value: "Tamil, English" },
  ].filter(Boolean);

  // ── PDF download ─────────────────────────────────────────────────────────
  const downloadResumeAsPDF = async () => {
    const resume = document.getElementById("resume-content");
    if (!resume) return;

    const savedScroll = window.scrollY;
    window.scrollTo(0, 0);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const options = {
      margin: 8,
      filename: "Manikandan_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById("resume-content");
          if (!el) return;
          el.style.width = "1024px";
          el.style.margin = "0";
          el.style.position = "static";
          // Force two-column layout — Bootstrap .row adds flex-wrap:wrap which breaks it
          const row = el.querySelector(".row");
          if (row) {
            row.style.display = "flex";
            row.style.flexWrap = "nowrap";
            row.style.marginLeft = "0";
            row.style.marginRight = "0";
          }
          el.querySelectorAll(".left, .right").forEach((col) => {
            col.style.width = "50%";
            col.style.flexShrink = "0";
          });
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    await html2pdf().set(options).from(resume).save("Manikandan_Resume.pdf");
    window.scrollTo(0, savedScroll);
  };

  return (
    <MyResumeContext.Provider
      value={{
        profileData,
        updateProfile,
        contactDetails,
        gitHubLinks,
        ExperienceDetails,
        technicalSkills,
        educationDetails,
        strength,
        personalDetails,
        downloadResumeAsPDF,
      }}
    >
      {children}
    </MyResumeContext.Provider>
  );
};

export default MyResumeContextProvider;
