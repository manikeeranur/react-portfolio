import React from "react";
import { Link } from "react-scroll";

const SectionHeader = ({ number, title, viewAllText, viewAllTo, icon }) => (
  <div className="section-header">
    <div className="section-header-left">
      <span className="section-number">{number}</span>
      <h2 className="section-title">
        {title}
        {icon && <i className={`fa ${icon} ms-2`} aria-hidden="true" />}
      </h2>
    </div>
    {viewAllText && viewAllTo && (
      <Link
        to={viewAllTo}
        smooth
        duration={500}
        offset={-90}
        className="section-viewall"
      >
        {viewAllText} <i className="fa fa-long-arrow-right ms-1" aria-hidden="true" />
      </Link>
    )}
  </div>
);

export default SectionHeader;
