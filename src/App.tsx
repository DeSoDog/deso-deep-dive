import React from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { BrowserRouter as Router, HashRouter, Routes } from "react-router-dom";
import DesoDrawer from "./components/layout/Drawer";
import { CHAPTERS } from "./chapters/ChapterHelper/Chapter.models";
function App() {
  const routes = CHAPTERS.chaptersToArray().map((chapter) =>
    chapter.chapterContent.component()
  );
  return (
    <HashRouter>
      <div className="my-[50px] ">
        <div className="flex-grow">
          <Header />
        </div>
        <div className="flex-grow">
          <Routes>{routes}</Routes>
        </div>
      </div>
      <DesoDrawer chapters={CHAPTERS} />
    </HashRouter>
  );
}

export default App;
