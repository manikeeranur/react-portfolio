import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Profile from "../../Images/Profile/manikandan_profile.jpeg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

const Home = () => {
  const handleViewResume = () => {
    window.open("/myresume", "_blank");
  };

  return (
    <div id="home">
      <div className="container">
        <div className="home-page pt-md-5">
          {/* Mobile profile image */}
          <motion.img
            src={Profile}
            alt="Manikandan"
            className="home-profile-img d-block d-md-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Text content */}
          <div className="col-md">
            <motion.p {...fadeUp(0)}>
              Hi, I'm <span className="wave">👋</span>
            </motion.p>

            <motion.h2 className="myJob" {...fadeUp(0.2)}>
              Manikandan A
            </motion.h2>

            <motion.div {...fadeUp(0.4)}>
              <TypeAnimation
                sequence={[
                  "Software Developer.",
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

            <motion.div className="mt-4 mt-md-5" {...fadeUp(0.6)}>
              <button
                className="download-button-new btn-sm mt-3"
                onClick={handleViewResume}
              >
                Get My Resume.
                <i className="fa fa-external-link ms-3" aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          {/* Desktop profile image */}
          <motion.div
            className="d-none d-md-flex align-items-center justify-content-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <img
              src={Profile}
              alt="Manikandan"
              className="home-profile-img-desktop"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
