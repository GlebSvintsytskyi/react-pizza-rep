import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Carts from "./pages/Carts";

import "./scss/app.scss";
import Admin from "./components/Admin";
import AdminPonel from "./pages/AdminPonel";

const App = () => {
  return (
    <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Admin />} />
          <Route path="/admin" element={<AdminPonel />} />
        </Routes>
    </div>
  );
};

export default App;
