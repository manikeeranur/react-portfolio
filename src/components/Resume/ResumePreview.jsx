import React, { useState, useEffect, useRef } from "react";
import MyResume from "./MyResume";
import API_BASE from "../../config";

const ResumePreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const topbarRef = useRef(null);

  // Mobile only: scale full 1024px resume to fit screen — no scroll
  useEffect(() => {
    const scaleResume = () => {
      const container = document.querySelector(".container-resume");
      const wrapper   = document.querySelector(".my-resume");
      if (!container || !wrapper) return;

      const vw = window.innerWidth;

      if (vw < 1024) {
        const topbarH = topbarRef.current ? topbarRef.current.offsetHeight : 50;
        const availH  = window.innerHeight - topbarH;

        // Reset to measure natural height
        container.style.transform      = "";
        container.style.marginLeft     = "";
        wrapper.style.height           = "";
        wrapper.style.overflow         = "";

        const naturalH = container.offsetHeight;

        // Fit both width and height
        const scale      = Math.min(vw / 1024, availH / naturalH);
        const scaledW    = 1024 * scale;
        const scaledH    = naturalH * scale;
        const leftOffset = (vw - scaledW) / 2;

        container.style.transform       = `scale(${scale})`;
        container.style.transformOrigin = "top left";
        container.style.marginLeft      = `${leftOffset}px`;
        wrapper.style.height            = `${scaledH}px`;
        wrapper.style.overflow          = "hidden";
      } else {
        // Large screen — restore everything, no changes
        container.style.transform       = "";
        container.style.transformOrigin = "";
        container.style.marginLeft      = "";
        wrapper.style.height            = "";
        wrapper.style.overflow          = "";
      }
    };

    const timer = setTimeout(scaleResume, 100);
    window.addEventListener("resize", scaleResume);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", scaleResume);
    };
  }, []);

  // Download — Puppeteer backend, no popup (unchanged)
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/api/pdf`);
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "Manikandan_Resume.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#fff",
      color: "#000",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div
        ref={topbarRef}
        className="resume-topbar"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 16px",
          backgroundColor: "#f8f8f8",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          style={{
            padding: "10px 28px",
            backgroundColor: isGenerating ? "#9e8fc4" : "#69599c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i
            className={`fa ${isGenerating ? "fa-spinner fa-spin" : "fa-download"}`}
            aria-hidden="true"
          />
          {isGenerating ? "Generating PDF…" : "Download PDF"}
        </button>
      </div>

      <MyResume />
    </div>
  );
};

export default ResumePreview;
