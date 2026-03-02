import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Pages/Main";
import MainLogin from "../Pages/MainLogin";
import Intro from "../Pages/Intro";
import Score from "../Pages/Score";
import Layout from "../Pages/Layout";
import ProtectedRoute from "./ProtectedRoute";

const Routefile = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Intro />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/main" element={<ProtectedRoute>
          <Main/>
        </ProtectedRoute>} />
        <Route path="/score" element={<ProtectedRoute>
          <Score />
        </ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default Routefile;
