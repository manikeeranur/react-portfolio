import { Button } from "@mui/material";
import React, { useState } from "react";
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
          <div className="col-12 col-md-8 details m-auto">
            {contactDetails.map((detail) => (
              <div className="detail">
                <div>{detail.title}</div>
                <div>{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
