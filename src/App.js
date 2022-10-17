import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./AppNavigation/Navigation";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <BrowserRouter>
          <div>
            <Navigation />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
