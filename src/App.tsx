import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutContent from "./components/layout/LayoutContent";
import { Header } from "./components/layout/Header";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Header />
        <LayoutContent></LayoutContent>
      </RecoilRoot>
    </>
  );
}

export default App;
