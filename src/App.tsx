import React from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesoDrawer from "./components/layout/Drawer";
import { CHAPTERS } from "./chapters/Chapter.models";

function App() {
  const routes = CHAPTERS.chaptersToArray().map((chapter) =>
    chapter.chapterContent.component()
  );
  console.log(routes);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={CHAPTERS.CHAPTER_0.component()}></Route>
        <Route path={""} element={CHAPTERS.CHAPTER_0.component()}></Route>

        {routes}
      </Routes>
      <DesoDrawer routes={["0", "1"]} chapters={CHAPTERS} />
    </Router>
  );
}

export default App;
