import React from "react";
import "./App.css";
import LayoutContent from "./components/layout/LayoutContent";
import { Header } from "./components/layout/Header";
import { useRecoilValue } from "recoil";
import { MyPublicKey } from "./recoil/AppState.atoms";

function App() {
  const myPublicKey = useRecoilValue(MyPublicKey);
  return (
    <>
      <Header />
      {myPublicKey && <LayoutContent></LayoutContent>}
    </>
  );
}

export default App;
