import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import { motion } from "framer-motion";

const iconBtn = (hoverBg, iconColor) => ({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: iconColor || "#e2e8f0",
    textDecoration: "none",
  },
  hover: { scale: 1.12, y: -3, background: hoverBg },
});

const LetsTalk = () => (
  <motion.div
    id="letstalk"
    style={{
      background: "#0f172a",
      padding: "80px 20px",
      textAlign: "center",
      marginTop: "100px",
    }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    <h2
      style={{
        color: "#f1f5f9",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: 800,
        marginBottom: "16px",
      }}
    >
      Let's Work Together
    </h2>

    <p
      style={{
        color: "#94a3b8",
        fontSize: "clamp(14px, 2vw, 16px)",
        maxWidth: "520px",
        margin: "0 auto 40px",
        lineHeight: "1.8",
      }}
    >
      I'm always interested in new opportunities and exciting projects.
      Let's discuss how we can bring your ideas to life.
    </p>

    <div
      style={{
        display: "flex",
        gap: "14px",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Call */}
      {(() => { const cfg = iconBtn("rgba(34,197,94,0.15)", "#4ade80"); return (
        <motion.a
          href="tel:+917402272187"
          whileHover={cfg.hover}
          whileTap={{ scale: 0.95 }}
          style={cfg.base}
          title="Call +91 74022 72187"
        >
          <CallIcon style={{ fontSize: 22 }} />
        </motion.a>
      ); })()}

      {/* WhatsApp */}
      {(() => { const cfg = iconBtn("rgba(37,211,102,0.15)", "#25d366"); return (
        <motion.a
          href="https://wa.me/917402272187"
          target="_blank"
          rel="noreferrer"
          whileHover={cfg.hover}
          whileTap={{ scale: 0.95 }}
          style={cfg.base}
          title="WhatsApp"
        >
          <WhatsAppIcon style={{ fontSize: 22 }} />
        </motion.a>
      ); })()}

      {/* YouTube */}
      {(() => { const cfg = iconBtn("rgba(255,0,0,0.12)", "#f87171"); return (
        <motion.a
          href="https://www.youtube.com/@studentcodertech8500"
          target="_blank"
          rel="noreferrer"
          whileHover={cfg.hover}
          whileTap={{ scale: 0.95 }}
          style={cfg.base}
          title="YouTube Channel"
        >
          <YouTubeIcon style={{ fontSize: 24 }} />
        </motion.a>
      ); })()}

      {/* GitHub */}
      {(() => { const cfg = iconBtn("rgba(255,255,255,0.1)", "#e2e8f0"); return (
        <motion.a
          href="https://github.com/manikeeranur"
          target="_blank"
          rel="noreferrer"
          whileHover={cfg.hover}
          whileTap={{ scale: 0.95 }}
          style={cfg.base}
          title="GitHub"
        >
          <GitHubIcon style={{ fontSize: 22 }} />
        </motion.a>
      ); })()}

      {/* LinkedIn */}
      {(() => { const cfg = iconBtn("rgba(10,102,194,0.18)", "#60a5fa"); return (
        <motion.a
          href="https://www.linkedin.com/in/manikandanarumugam001"
          target="_blank"
          rel="noreferrer"
          whileHover={cfg.hover}
          whileTap={{ scale: 0.95 }}
          style={cfg.base}
          title="LinkedIn"
        >
          <LinkedInIcon style={{ fontSize: 22 }} />
        </motion.a>
      ); })()}
    </div>
  </motion.div>
);

export default LetsTalk;
