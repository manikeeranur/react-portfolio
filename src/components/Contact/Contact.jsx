import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Profile from "../../Images/Profile/manikandan.png";

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
  return (
    <div className="contact-form">
      <div className="container">
        <div className="col-12 col-md-4">
          <div className="d-flex gap-5 flex-column align-items-center">
            <img src={Profile} alt="" />

            <div className="d-flex  gap-3">
              {socialMedia.map((data) => (
                <Button size="large" href={data.link} target="_blank">
                  {data.icon}{" "}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
