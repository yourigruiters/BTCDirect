import React from "react";
import "./App.scss";
import CoinsPage from "./pages/Coins.page";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="app">
      <CoinsPage />
    </div>
  );
};

export default App;
