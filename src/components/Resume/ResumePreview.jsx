import React, { useState } from "react";
import MyResume from "./MyResume";

const ResumePreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/pdf");
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
