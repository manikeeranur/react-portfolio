import React, { useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyResumeContext } from "../context/MyResumeContext";
import SectionHeader from "../common/SectionHeader";

const Contact = () => {
  const { profileData, contactDetails } = useContext(MyResumeContext);
  const { personalInfo } = profileData;

  const iconMap = {
    "fa-envelope-o":   "fa-envelope-o",
    "fa-mobile-phone": "fa-phone",
    "fa-github":       "fa-github",
    "fa-linkedin":     "fa-linkedin",
  };

  const stripProtocol = (v) =>
    typeof v === "string" ? v.replace(/^https?:\/\//, "") : v;

  const contactRows = contactDetails.map((c) => ({
    icon: iconMap[c.icon] || c.icon,
    title: c.title,
    value: stripProtocol(c.details),
  }));

  const extraRows = [
    personalInfo.location && {
      icon: "fa-map-marker",
      title: "Location",
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
    <div className="section-card" id="contact">
      <div className="home-container">
        <SectionHeader number="06" title="Contact Me" />

        <div className="contact-grid">
          <div className="contact-details-col">
            {allRows.map((row, i) => (
              <div key={i} className="contact-detail-row">
                <span className="contact-detail-icon">
                  <i className={`fa ${row.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <div className="contact-detail-title">{row.title}</div>
                  <div className="contact-detail-value">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-col">
            <form ref={form} onSubmit={sendEmail}>
              <div className="contact-form-row">
                <div className="form-group mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="from_name"
                    className="form-control"
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                  autoComplete="off"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Write your message..."
                  rows={4}
                  autoComplete="off"
                  required
                />
              </div>
              <button type="submit" className="btn-send">
                <i className="fa fa-paper-plane-o me-2" aria-hidden="true" />
                Send Message
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
