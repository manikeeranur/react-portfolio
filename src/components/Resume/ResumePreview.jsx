import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MyResume from "./MyResume";

const ResumePreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("resume-content");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      const margin = 8; // mm — padding on all sides
      const a4Width = 210;
      const printWidth = a4Width - margin * 2;
      const printHeight = (canvas.height * printWidth) / canvas.width;
      const pageHeight = printHeight + margin * 2;

      const pdf = new jsPDF({
        unit: "mm",
        format: [a4Width, pageHeight],
        orientation: "portrait",
      });

      pdf.addImage(imgData, "JPEG", margin, margin, printWidth, printHeight);
      pdf.save("Manikandan_Resume.pdf");
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
