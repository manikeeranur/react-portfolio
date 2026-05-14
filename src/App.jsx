// import React from "react";
// import Skills from "./components/Skills/Skills";
// import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/Home/Home";
// import MyResume from "./components/Resume/MyResume";
// import MyResumeContextProvider from "./components/context/MyResumeContext";
// import Education from "./components/Education/Education";
// import Experience from "./components/Experience/Experience";
// import Contact from "./components/Contact/Contact";
// import FileUploader from "./components/FileUploader";
// import Youtube from "./components/Youtube/Youtube";
// import Projects from "./components/Projects/Projects";

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <MyResumeContextProvider>
//           <Navbar />

//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Home />
//                   <Education />
//                   <Experience />
//                   <Skills />
//                   <Contact />
//                   <Youtube />
//                   <Projects />
//                 </>
//               }
//             />
//           </Routes>
//           <Routes>
//             <Route path="/myresume" element={<MyResume />} />
//           </Routes>
//           <Routes>
//             <Route path="/fileuploader/*" element={<FileUploader />} />
//           </Routes>
//         </MyResumeContextProvider>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ResumePreview from "./components/Resume/ResumePreview";
import MyResumeContextProvider from "./components/context/MyResumeContext";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Skills from "./components/Skills/Skills";
import FileUploader from "./components/FileUploader";
import Youtube from "./components/Youtube/Youtube";
import Projects from "./components/Projects/Projects";

const AppContent = () => {
  const location = useLocation();
  const isMyResumePage = location.pathname === "/myresume"; // Check if on /myresume

  useEffect(() => {
    document.body.style.background = isMyResumePage ? "#ffffff" : "";
    return () => { document.body.style.background = ""; };
  }, [isMyResumePage]);


  
  return (
    <MyResumeContextProvider>
      {!isMyResumePage && <Navbar />} {/* Hide Navbar on /myresume */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Education />
              <Experience />
              <Skills />
              <Contact />
              <Youtube />
              <Projects />
            </>
          }
        />
        <Route path="/myresume" element={<ResumePreview />} />
        <Route path="/fileuploader/*" element={<FileUploader />} />
      </Routes>
    </MyResumeContextProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
