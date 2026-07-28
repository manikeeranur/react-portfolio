import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const STATS = [
  { icon: "fa-code",         value: "10+", label: "Projects Completed" },
  { icon: "fa-smile-o",      value: "5+",  label: "Happy Clients" },
  { icon: "fa-clock-o",      value: "2+",  label: "Years of Experience" },
  { icon: "fa-thumbs-o-up",  value: "99%", label: "Client Satisfaction" },
];

const StatsBar = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div className="stats-bar" ref={ref}>
      {STATS.map((s, i) => (
        <motion.div
          className="stat-card"
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="stat-icon">
            <i className={`fa ${s.icon}`} aria-hidden="true" />
          </div>
          <div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;
