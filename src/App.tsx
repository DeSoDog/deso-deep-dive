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
      <Routes>{routes}</Routes>
      <DesoDrawer chapters={CHAPTERS} />
      {/* <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      /> */}
    </Router>
  );
}

export default App;
