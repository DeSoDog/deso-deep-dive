import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutContent from "./components/layout/LayoutContent";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <>
      <Header />
      <LayoutContent></LayoutContent>
    </>
  );
}

export default App;
