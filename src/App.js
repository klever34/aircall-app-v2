import React from "react";
import ReactDOM from "react-dom";
import HeaderImage from "./HeaderImage";
import Activities from "../src/screens/Activities";

const App = () => {
  return (
    <div className="app-container">
      <HeaderImage />
      <Activities />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
