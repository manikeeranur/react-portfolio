import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Profile from "../../Images/Profile/manikandan_profile.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [socialMedia, setSocialMedia] = useState([
    {
      icon: <GitHubIcon />,
      link: "https://github.com/manikeeranur",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/manikeeranur/",
    },
    {
      icon: <XIcon />,
      link: "https://x.com/Manikeeranur1",
    },
    {
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/in/manikandan-arumugam-577899203/",
    },
  ]);

  const [contactDetails, setContactDetails] = useState([
    {
      icon: "fa fa-envelope-o",
      title: "Email",
      value: "manikeeranur2105@gmail.com",
    },
    {
      icon: "fa fa-phone",
      title: "Mobile",
      value: "+91 7402272187",
    },
    {
      icon: "fa fa-graduation-cap",
      title: "Degree",
      value: "Master of Computer Applications",
    },

    {
      icon: "fa fa-map-marker",
      title: "Address",
      value: "Chennai,Tamil Nadu - India",
    },
  ]);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ce31qr7", "template_cf7qdo9", form.current, {
        publicKey: "3JMxe97whwmmH8TI-",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast("Email Send Successfully", {
            position: "bottom-left",
          });
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
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="col-12 col-md-4 d-none">
              <div className="d-flex gap-5 flex-column align-items-center">
                <img src={Profile} alt="" className="rounded-circle col-6" />
                <div className="d-flex  gap-3">
                  {socialMedia.map((data) => (
                    <Button
                      size="large"
                      className="bg-light text-dark"
                      href={data.link}
                      target="_blank"
                    >
                      {data.icon}{" "}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-md">
              <div className="d-flex flex-wrap">
                <div className="detail col-md-6 col-12">
                  <img
                    src={Profile}
                    alt=""
                    className="rounded-circle fa"
                    width="50px"
                  />
                  <div>
                    <div className="text-nowrap">Manikandan Arumugam</div>
                    <div className="text-nowrap">Frontend Developer</div>
                  </div>
                </div>
                {contactDetails.map((detail) => (
                  <div className="detail col-md-6 col-12">
                    <i className={`fa ${detail?.icon}`} aria-hidden="true"></i>
                    <div className="col">
                      <div>{detail.title}</div>
                      <div className="col-12 col-md-9">{detail.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
