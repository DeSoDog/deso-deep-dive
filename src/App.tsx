import React from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import DesoDrawer from "./components/layout/Drawer";
import { CHAPTERS } from "./chapters/ChapterHelper/Chapter.models";
import { createTheme, PaletteOptions } from "@mui/material";
function App() {
  const routes = CHAPTERS.chaptersToArray().map((chapter) =>
    chapter.chapterContent.component()
  );
  return (
    <Router>
      <Header />
      <div className="my-[50px]">
        <Routes>{routes}</Routes>
      </div>
      <DesoDrawer chapters={CHAPTERS} />
    </Router>
  );
}

export default App;
