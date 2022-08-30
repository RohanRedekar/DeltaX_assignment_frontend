import React from "react";
import { Routes, Route } from "react-router-dom";
import AddSong from "./Pages/AddSong";
import HomePage from "./Pages/HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/addsong' element={<AddSong />} />
    </Routes>
  );
};

export default AllRoutes;
