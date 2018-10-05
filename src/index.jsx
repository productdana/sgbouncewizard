import React from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./components/HelloWorld";
import "./index.scss";

const App = () => (
  <div>
    <h1>Bounce Wizard</h1>
    <HelloWorld name="UCI Capstone" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
