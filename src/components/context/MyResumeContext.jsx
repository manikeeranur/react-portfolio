import React, { createContext } from "react";
import html2pdf from "html2pdf.js";
import WorkExperience from "../Resume/WorkExperience";
export const ResumeContext = createContext();
export const MyResumeContext = createContext();
const MyResumeContextProvider = ({ children }) => {
  const contactDetails = [
    {
      icon: "fa-envelope-o",
      details: "manikeeranur2105@gmail.com",
    },
    {
      icon: "fa-mobile-phone",
      details: "(+91) 74022 72187",
    },
    {
      icon: "fa-github",
      details: "https://github.com/manikeeranur",
    },
    {
      icon: "fa-map-marker",
      details: "Chennai",
    },
  ];

  const gitHubLinks = [
    "https://manikeeranur.github.io/Portfolio/",
    "https://manikeeranur.github.io/Reactproject1/",
  ];

  const ExperienceDetails = [
    {
      role: "Front-End Developer",
      companyName: "Genrichers Innovations Private limited - Chennai.",
      experience: <WorkExperience startDate="11-Sep-2023" tillWorking={true} />,
      technology: "MUI, SCSS, Next Js.",
      project: "Impacteers",
      client: "",
      projectDescription: [
        "Developed using Next.js, TypeScript, Material-UI (MUI), and SCSS, it offers a seamless experience with features like intuitive resume building tools, job search integration, and vibrant community interaction",
        "Impacteer is a next-generation platform designed for students and professionals, facilitating community-driven resume building and job seeking.",
        "Collaborated with UX/UI designers and backend developers to implement user-friendly interfaces and integrate with RESTful APIs.",
        "Implemented state management using Context API.",
      ],
    },
    {
      role: "UI/UX Designer",
      companyName: "Leadtech Solutions Pvt Ltd - Chennai.",
      experience: (
        <WorkExperience startDate="02-Aug-2021" endDate="08-Sep-2023" />
      ),
      technology: "HTML5, CSS3, React Js.",
      project: "iFACT – Integrated Freight forwarding, Agency and Cargo",
      client: "Logistics",
      projectDescription: [
        "The Project deals with the online freight forwarding business. Freight forwarding is done by Ocean Imports and Exports, Air Imports and Exports.",
        "The users can generate Job, Quotation, Booking, Invoice, Our BL, Liner BL, BL Release, Outstanding, Cargo and Containers. One can easily take monthly reports, volume and revenue by customer wise and by port wise and many more.",
        "The main aim of developing this project is to bring the users online from various branches, and store the data in one single location.",
      ],
    },

    {
      role: "Intern React Developer",
      companyName: "Hermitz Media Pvt Ltd - Banglore.",
      experience: "3 Months",
      technology: "React Js.",
      projectDescription: [],
    },
  ];

  const technicalSkills = [
    {
      title: "Language",
      value: "HTML5, CSS3, JavaScript, JQuery",
    },
    {
      title: "Framework/Library",
      value: "Bootstrap5, Material UI, React Js, Next Js",
    },
    {
      title: "Version control",
      value: "Git / GitHub",
    },
    {
      title: "Tools",
      value: "Visual Studio Code",
    },
  ];
  const educationDetails = [
    {
      degree: "Master of Computer Applications",
      institute: "MIET Arts & Science College, Trichy",
      year: "2019 – 2021",
      percentage: "80%",
    },
    {
      degree: "Bachelor of Computer Applications",
      institute: "H.H.The Rajah’s college(Autonomous),Pudukkottai",
      year: "2016 -2019",
      percentage: "66.57%",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institute: "Punitha Arockia Annai Higher Secondary School, Keeranur",
      year: "2016",
      percentage: "67.09%",
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institute: "Punitha Arockia Annai Higher Secondary School, Keeranur",
      year: "2014",
      percentage: "83.04%",
    },
  ];
  const strength = [
    "Sincerity and Self-motivated, Self-analysis.",
    "Hard work and Dedication.",
    "Have a good communication with others.",
  ];
  const personalDetails = [
    {
      title: "DOB",
      value: "6th Oct, 1998",
    },
    {
      title: "Father Name",
      value: "Arumugam M",
    },
    {
      title: "Gender",
      value: "Male",
    },
    {
      title: "Nationality",
      value: "Indian",
    },
    {
      title: "Language Known",
      value: "Tamil, English",
    },
  ];

  const downloadResumeAsPDF = () => {
    const resume = document.getElementById("resume-content");
    const options = {
      margin: 10,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, logging: true, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };
    html2pdf().set(options).from(resume).save("Manikandan_Resume.pdf");
  };

  return (
    <>
      <MyResumeContext.Provider
        value={{
          contactDetails,
          gitHubLinks,
          ExperienceDetails,
          technicalSkills,
          educationDetails,
          strength,
          personalDetails,
          downloadResumeAsPDF,
        }}
      >
        {children}
      </MyResumeContext.Provider>
    </>
  );
};

export default MyResumeContextProvider;
