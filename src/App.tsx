import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutContent from "./components/layout/LayoutContent";
import { Header } from "./components/layout/Header";
import { RecoilRoot } from "recoil";
import {
  loginWithIdentity,
  subscribeToIdentity,
} from "./services/DesoIdentity";

function App() {
  useEffect(() => {
    subscribeToIdentity();
    window.open("https://identity.deso.org/log-in");
  }, []);
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
