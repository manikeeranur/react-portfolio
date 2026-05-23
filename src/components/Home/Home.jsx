import React, { useContext } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { MyResumeContext } from "../context/MyResumeContext";

const staticProfile = "/images/profile/manikandan_profile.jpeg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Home = () => {
  const { profileData } = useContext(MyResumeContext);
  const { personalInfo, profileImage } = profileData;

  const displayName  = personalInfo.name  || "Manikandan A";
  const displayTitle = personalInfo.title || "Frontend Developer";
  const displayImg   = profileImage || staticProfile;

  const handleViewResume = () => {
    window.open("/myresume", "_blank");
  };

  return (
    <div id="home">
      <div className="container">
        <div className="home-page pt-md-5">

          {/* Mobile profile */}
          <motion.div
            className="d-block d-md-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="profile-ring-wrapper profile-ring-sm">
              <div className="profile-ring-inner">
                <img src={displayImg} alt={displayName} className="home-profile-img" />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="col-md">
            <motion.p className="home-greeting" {...fadeUp(0)}>
              Hi, I'm <span className="wave">👋</span>
            </motion.p>

            <motion.h1 className="myJob" {...fadeUp(0.18)}>
              {displayName}
            </motion.h1>

            <motion.div {...fadeUp(0.36)}>
              <TypeAnimation
                sequence={[
                  displayTitle + ".",
                  2000,
                  "Frontend Developer.",
                  2000,
                  "React Developer.",
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                className="role"
                repeat={Infinity}
              />
            </motion.div>

            <motion.div {...fadeUp(0.54)} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="download-button-new" onClick={handleViewResume}>
                Get My Resume
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </button>
              <Link to="contact" smooth duration={500} offset={-80}>
                <button className="download-button-outline">
                  Get In Touch
                  <i className="fa fa-envelope-o ms-2" aria-hidden="true" />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Desktop profile with rotating ring */}
          <motion.div
            className="d-none d-md-flex align-items-center justify-content-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="profile-ring-wrapper"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="profile-ring-inner">
                <img
                  src={displayImg}
                  alt={displayName}
                  className="home-profile-img-desktop"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Home;
