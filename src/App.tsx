import React from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chapter0 } from "./chapters/Chapter0";
import DesoDrawer from "./components/layout/Drawer";
import { CHAPTERS } from "./chapters/Chapter.models";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Chapter0 />}></Route>
        <Route
          path={CHAPTERS.CHAPTER_0.route}
          element={CHAPTERS.CHAPTER_0.component}
        ></Route>
        <Route
          path={CHAPTERS.CHAPTER_1.route}
          element={CHAPTERS.CHAPTER_1.component}
        ></Route>

        <Route
          path={CHAPTERS.CHAPTER_SAMPLE_APP.route}
          element={CHAPTERS.CHAPTER_SAMPLE_APP.component}
        ></Route>
      </Routes>
      <DesoDrawer routes={["0", "1"]} />
    </Router>
  );
}

export default App;
