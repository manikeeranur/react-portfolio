import React from "react";
import Skills from "./components/Skills/Skills";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import MyResume from "./components/Resume/MyResume";
import MyResumeContextProvider from "./components/context/MyResumeContext";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import FileUploader from "./components/FileUploader";
import Youtube from "./components/Youtube/Youtube";
import Projects from "./components/Projects/Projects";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MyResumeContextProvider>
          <Navbar />

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
          </Routes>
          <Routes>
            <Route path="/myresume" element={<MyResume />} />
          </Routes>
          <Routes>
            <Route path="/fileuploader/*" element={<FileUploader />} />
          </Routes>
        </MyResumeContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
