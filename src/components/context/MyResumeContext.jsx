import React, { createContext } from "react";
import html2pdf from "html2pdf.js";
import WorkExperience from "../Resume/WorkExperience";
export const ResumeContext = createContext();
export const MyResumeContext = createContext();
const MyResumeContextProvider = ({ children }) => {
  const contactDetails = [
    {
      icon: "fa-envelope-o",
      title: "Email",
      details: "manikeeranur2105@gmail.com",
    },
    {
      icon: "fa-mobile-phone",
      title: "Phone",
      details: "(+91) 74022 72187",
    },
    // {
    //   icon: "fa-globe",
    //   title: "Portfolio",
    //   details: "https://www.manikandan.site",
    // },
    {
      icon: "fa-github",
      title: "GitHub",
      details: "https://github.com/manikeeranur",
    },
    {
      icon: "fa-linkedin",
      title: "LinkedIn",
      details: "https://www.linkedin.com/in/manikandanarumugam001",
    },
  ];

  const gitHubLinks = [
    "https://manikeeranur.github.io/Reactproject1/",
    // "https://github.com/manikeeranur",
    // "https://www.manikandan.site",
  ];

  const ExperienceDetails = [
    {
      role: "Front-End Developer",
      companyName: "Genrichers Innovations Private limited - Chennai.",
      experience: <WorkExperience startDate="11-Sep-2023" tillWorking={true} />,
      technology: "Next.js, TypeScript, Material-UI (MUI), SCSS",
      project: "Impacteers",
      client: "",
      // projectDescription: [
      //   "Developed a real-time resume builder with customizable templates.",
      //   "Built interactive community features for networking and mentorship.",
      //   "Integrated job recommendations based on user skills and interests.",
      //   "Implemented RESTful API integrations for job listings and company profiles.",
      //   "Led frontend development using Next.js, TypeScript, MUI, Tailwind CSS ensuring responsiveness.",
      //   "Collaborated with UI/UX teams for a modern, accessible interface.",
      //   "Optimized state management with Redux, improving performance.",
      // ],
      // projectDescription: [
      //   "Led frontend development using Next.js, TypeScript, MUI, and Tailwind CSS, delivering responsive UI with 99% cross-device compatibility.",
      //   "Developed a real-time resume builder with customizable templates, increasing user engagement by 30%.",
      //   "Built interactive community features for networking and mentorship, boosting user retention by 25%.",
      //   "Integrated job recommendation logic based on user skills and interests, resulting in a 20% rise in job application conversions.",
      //   "Implemented RESTful API integrations for job listings and company profiles, reducing data fetch time by 40%.",
      //   "Collaborated with UI/UX teams to create modern, accessible interfaces, ensuring WCAG 2.1 compliance and improving usability scores by 18%.",
      //   "Enhanced user experience by building reusable React.js components, improving development speed and app performance by 35%.",
      //   "Optimized global state management using Redux, decreasing unnecessary re-renders and improving app performance by 25%.",
      // ],
      projectDescription: [
        "Led frontend development with Next.js, TypeScript, MUI, and Tailwind CSS, ensuring 99% cross-device responsiveness.",
        "Built interactive community features for networking and mentorship, boosting user retention by 25%.",
        "Developed a real-time resume builder with customizable templates, increasing user engagement by 30%.",
        "Integrated skill-based job recommendations, improving application conversions by 20%.",
        "Implemented RESTful API integrations for job listings and company profiles, reducing data fetch time by 40%.",
        "Collaborated with UI/UX teams to create modern, accessible interfaces, ensuring WCAG 2.1 compliance and improving usability scores by 18%.",
        "Optimized global state management using Redux, decreasing unnecessary re-renders and improving app performance by 25%.",
      ],
    },
    {
      role: "Front-End Developer",
      companyName: "Leadtech Solutions Pvt Ltd - Chennai.",
      experience: (
        <WorkExperience startDate="02-Aug-2021" endDate="08-Sep-2023" />
      ),
      technology: "HTML5, CSS3, React Js.",
      project: "iFACT – Integrated Freight forwarding, Agency and Cargo",
      client: "Logistics",
      // projectDescription: [
      //   "The Project deals with the online freight forwarding business.",
      //   "Freight forwarding is done by Ocean Imports and Exports, Air Imports and Exports.",
      //   "The users can generate Job, Quotation, Booking, Invoice, Our BL, Liner BL, BL Release, Outstanding, Cargo and Containers.",
      //   "One can easily take monthly reports, volume and revenue by customer wise and by port wise and many more.",
      //   "The main aim of developing this project is to bring the users online from various branches, and store the data in one single location.",
      // ],
      projectDescription: [
        "Led frontend development for integrated freight forwarding solutions, contributing to a 30% improvement in user workflow efficiency through intuitive UI and optimized component structures.",
        "Developed high-performance web applications using React.js, achieving faster load times (up to 40%) and seamless navigation.",
        "Collaborated closely with UI/UX teams to build modern, accessible interfaces, ensuring WCAG compliance and improving user engagement metrics.",
        "Integrated RESTful APIs and ensured mobile responsiveness, which helped reduce support tickets related to UI issues by 25%.",
        "Enhanced user experience by contributing extensively to React.js components, improving component reusability and performance.",
        "Managed frontend tasks in logistics and cargo management projects, driving better coordination and reducing development turnaround time by 20%.",
      ],
    },

    // {
    //   role: "Intern React Developer",
    //   companyName: "Hermitz Media Pvt Ltd - (Remote).",
    //   experience: "3 Months",
    //   technology: "React Js.",
    //   projectDescription: [],
    // },
  ];

  const technicalSkills = [
    {
      title: "Language",
      value: "JavaScript, TypeScript, HTML5, CSS3",
    },
    {
      title: "Frameworks & Libraries",
      value: "React.js, Next.js",
    },
    {
      title: "State Management",
      value: "Context API, Redux",
    },
    {
      title: "UI Libraries & Styling",
      value: "MUI, Tailwind CSS, Bootstrap, SCSS, ShadCN",
    },
    // {
    //   title: "MERN Stack",
    //   value: "MongoDB, Express.js, React.js, Node.js",
    // },
    {
      title: "Version Control & CI/CD",
      value: "Git, GitHub, Bitbucket, Jenkins",
    },
    {
      title: "Tools & Platforms",
      value: "Postman, AWS S3, Jira",
    },
    {
      title: "Development Tools",
      value: "VS Code, Chrome DevTools",
    },
  ];
  const educationDetails = [
    {
      degree: "Master of Computer Applications",
      institute: "MIET Arts & Science College, Trichy",
      year: "2019 - 2021",
      percentage: "80%",
    },
    {
      degree: "Bachelor of Computer Applications",
      institute: "H.H.The Rajah’s college(Autonomous), Pudukkottai",
      year: "2016 - 2019",
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
    // {
    //   title: "DOB",
    //   value: "6th Oct, 1998",
    // },
    // {
    //   title: "Father Name",
    //   value: "Arumugam M",
    // },
    // {
    //   title: "Gender",
    //   value: "Male",
    // },
    // {
    //   title: "Nationality",
    //   value: "Indian",
    // },
    {
      title: "Portfolio",
      value: "https://www.manikandan.site",
    },
    {
      title: "Blog",
      value: "https://blog.manikandan.site",
    },
    {
      title: "Language Known",
      value: "Tamil, English",
    },
  ];

  const downloadResumeAsPDF = () => {
    const resume = document.getElementById("resume-content");
    if (!resume) return Promise.resolve();

    const options = {
      margin: 0,
      filename: "Manikandan_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const wrapper = clonedDoc.getElementById("resume-pdf-wrapper");
          if (wrapper) {
            wrapper.style.display = "block";
            wrapper.style.position = "fixed";
            wrapper.style.top = "0";
            wrapper.style.left = "0";
            wrapper.style.width = "1024px";
          }
        },
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    return html2pdf().set(options).from(resume).save("Manikandan_Resume.pdf");
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
