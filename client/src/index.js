import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DownloadFile from "./components/Downloadfile";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/download" element={<DownloadFile />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
