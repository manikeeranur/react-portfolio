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
const App = () => {
  return (
    <>
      <BrowserRouter>
        <MyResumeContextProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <Routes>
            <Route path="/education" element={<Education />} />
          </Routes>

          <Routes>
            <Route path="/experience" element={<Experience />} />
          </Routes>

          <Routes>
            <Route path="/skills" element={<Skills />} />
          </Routes>
          <Routes>
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Routes>
            <Route path="/myresume" element={<MyResume />} />
          </Routes>
        </MyResumeContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
