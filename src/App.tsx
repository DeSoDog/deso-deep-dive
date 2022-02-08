import React from "react";
import "./App.css";
import { Header } from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DesoDrawer from "./components/layout/Drawer";
import { CHAPTERS } from "./chapters/Chapter.models";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={CHAPTERS.CHAPTER_0.component()}></Route>
        <Route
          path={CHAPTERS.CHAPTER_0.route}
          element={CHAPTERS.CHAPTER_0.component()}
        ></Route>
        <Route
          path={CHAPTERS.CHAPTER_1_GET_SINGLE_PROFILE.route}
          element={CHAPTERS.CHAPTER_1_GET_SINGLE_PROFILE.component()}
        ></Route>
        <Route
          path={CHAPTERS.CHAPTER_1_GET_USERS_STATELESS.route}
          element={CHAPTERS.CHAPTER_1_GET_USERS_STATELESS.component()}
        ></Route>
        <Route
          path={CHAPTERS.CHAPTER_SAMPLE_APP.route}
          element={CHAPTERS.CHAPTER_SAMPLE_APP.component()}
        ></Route>
      </Routes>
      <DesoDrawer routes={["0", "1"]} />
    </Router>
  );
}

export default App;
