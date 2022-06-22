import React from "react";
// import Navbar from "../components/navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Appraisal from "../pages/appraisal";

export default function Routers() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Appraisal />} />
        <Route path="/appraisal" element={<Appraisal />} />
      </Routes>
    </Router>
  );
}
