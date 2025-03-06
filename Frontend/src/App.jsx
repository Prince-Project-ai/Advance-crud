import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SiteRouter from "./Routes/SiteRouter";
import AdminRouter from "./Routes/AdminRouter";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SiteRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
