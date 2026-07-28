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
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ResumePreview from "./components/Resume/ResumePreview";
import MyResumeContextProvider from "./components/context/MyResumeContext";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import TechStack from "./components/TechStack/TechStack";
import FileUploader from "./components/FileUploader";
import Youtube from "./components/Youtube/Youtube";
import Projects from "./components/Projects/Projects";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import { AuthProvider, useAuth } from "./components/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const isMyResumePage = location.pathname === "/myresume";
  const isAuthPage = ["/login", "/profile"].includes(location.pathname);

  useEffect(() => {
    if (isMyResumePage) {
      document.body.style.background = "#ffffff";
      document.body.style.color = "#000000";
    } else {
      document.body.style.background = "";
      document.body.style.color = "";
    }
    return () => {
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, [isMyResumePage]);

  return (
    <MyResumeContextProvider>
      {!isMyResumePage && !isAuthPage && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <TechStack />
              <Projects />
              <Experience />
              <Youtube />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/myresume" element={<ResumePreview />} />
        <Route path="/fileuploader/*" element={<FileUploader />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </MyResumeContextProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
