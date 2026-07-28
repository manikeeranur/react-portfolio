import React from "react";
import SectionHeader from "../common/SectionHeader";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import youtubeBanner from "../../Images/Youtube/youtube-banner.png";

const CHANNEL_URL = "https://www.youtube.com/@studentcodertech8500";

const STATS = [
  { value: "50+", label: "Videos" },
  { value: "10K+", label: "Subscribers" },
  { value: "1M+", label: "Views" },
  { value: "4.8★", label: "Average Rating" },
];

const Youtube = () => {
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <div className="section-card" id="youtube" ref={ref}>
      <div className="home-container">
        <SectionHeader
          number="05"
          title="YouTube Channel"
          viewAllText="View channel"
          viewAllTo="youtube"
        />

        <div className={`youtube-panel ${isVisible ? "is-visible" : ""}`}>
          <img
            src={youtubeBanner}
            alt="Student Coder Tech YouTube channel"
            width={"100%"}
            style={{ borderRadius: 16, overflow: "hidden" }}
          />

          <div className="youtube-info">
            <div className="youtube-heading">Student Coder Tech! 🎯</div>
            <p>
              Student Coder Tech is a Tamil programming YouTube channel
              dedicated to making web development easy for beginners. Learn
              HTML, CSS, and UI Development with step-by-step tutorials and
              hands-on projects.
            </p>

            <div className="youtube-stats">
              {STATS.map((s) => (
                <div className="youtube-stat" key={s.label}>
                  <div className="youtube-stat-value">{s.value}</div>
                  <div className="youtube-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="download-button-new"
            >
              Subscribe on YouTube
              <i className="fa fa-youtube-play ms-2" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
