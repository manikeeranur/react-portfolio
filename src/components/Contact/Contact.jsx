import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Profile from "../../Images/Profile/profile.jpeg";

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
      title: "Name",
      value: "Manikandan A",
    },

    {
      title: "Email",
      value: "manikeeranur2105@gmail.com",
    },
    {
      title: "Mobile",
      value: "+91 7402272187",
    },
    {
      title: "Degree",
      value: "Master of Computer Applications",
    },
    {
      title: "D.O.B",
      value: "6th Oct,1998",
    },

    {
      title: "State",
      value: "Tamilnadu",
    },
    {
      title: "District",
      value: "Pudukkottai",
    },
    {
      title: "Address",
      value: "16, Kallar Street, Keeranur",
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
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="container">
      <div className="contact-form">
        <div className="d-flex flex-wrap align-items-center h-100">
          <div className="col-12 col-md-4">
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

          <div className="col-12 col-md-4 details m-auto ">
            {contactDetails.map((detail) => (
              <div className="detail">
                <div>{detail.title}</div>
                <div>{detail.value}</div>
              </div>
            ))}
          </div>

          <div className="col-12 col-md-4 py-5 py-md-0">
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group mb-3">
                <label className="form-label text-white">Name</label>
                <input
                  type="text"
                  name="from_name"
                  className="form-control"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  name="from_email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label text-white">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Enter Your Message"
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="btn btn-sm btn-light mb-3">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
