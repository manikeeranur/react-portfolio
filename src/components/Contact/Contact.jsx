import { Button } from "@mui/material";
import React, { useState, useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyResumeContext } from "../context/MyResumeContext";

const staticProfile = "/images/profile/manikandan_profile.jpeg";

const Contact = () => {
  const { profileData, contactDetails } = useContext(MyResumeContext);
  const { personalInfo, profileImage } = profileData;

  const displayName  = personalInfo.name  || "Manikandan Arumugam";
  const displayTitle = personalInfo.title || "Frontend Developer";
  const displayImg   = profileImage || staticProfile;

  const socialMedia = [
    { icon: <GitHubIcon />,    link: personalInfo.github   || "https://github.com/manikeeranur" },
    { icon: <InstagramIcon />, link: "https://www.instagram.com/manikeeranur/" },
    { icon: <XIcon />,         link: "https://x.com/Manikeeranur1" },
    { icon: <LinkedInIcon />,  link: personalInfo.linkedin || "https://www.linkedin.com/in/manikandan-arumugam-577899203/" },
  ];

  // Map contactDetails from context to the icon format used in this view
  const iconMap = {
    "fa-envelope-o":   "fa fa-envelope-o",
    "fa-mobile-phone": "fa fa-phone",
    "fa-github":       "fa fa-github",
    "fa-linkedin":     "fa fa-linkedin",
  };

  // Build the display list: profile image row + contact rows
  const contactRows = contactDetails.map((c) => ({
    icon: iconMap[c.icon] || `fa ${c.icon}`,
    title: c.title,
    value: c.details,
  }));

  // Always add degree + address from personalInfo if available
  const extraRows = [
    personalInfo.location && {
      icon: "fa fa-map-marker",
      title: "Address",
      value: personalInfo.location,
    },
  ].filter(Boolean);

  const allRows = [...contactRows, ...extraRows];

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_ce31qr7", "template_cf7qdo9", form.current, {
        publicKey: "3JMxe97whwmmH8TI-",
      })
      .then(
        () => {
          toast("Email Sent Successfully", { position: "bottom-left" });
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div id="contact">
      <div className="container">
        <div className="heading-top">Contact Details</div>
        <div className="contact-form">
          <div className="d-flex flex-wrap gap-3">
            <div className="col-12 col-md">
              <div className="d-flex flex-wrap">
                {/* Profile identity row */}
                <div className="detail col-md-6 col-12">
                  <img
                    src={displayImg}
                    alt={displayName}
                    className="rounded-circle fa"
                    width="50px"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div className="text-nowrap">{displayName}</div>
                    <div className="text-nowrap">{displayTitle}</div>
                  </div>
                </div>

                {/* Dynamic contact rows */}
                {allRows.map((row, i) => (
                  <div key={i} className="detail col-md-6 col-12">
                    <i className={row.icon} aria-hidden="true"></i>
                    <div className="col">
                      <div>{row.title}</div>
                      <div className="col-12 col-md-9">{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email form */}
            <div className="col-12 col-md-4 py-5 py-md-0">
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="from_name"
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="from_email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Your Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Enter Your Message"
                    rows={3}
                    autoComplete="off"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-sm btn-send mb-3">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
