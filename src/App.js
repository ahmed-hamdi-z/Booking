import  React from 'react';
import  { BrowserRouter } from 'react-router-dom';
import Navigation from './AppNavigation/Navigation';
import Navbar from './component/Navbar'



function App() {
  return (
    <div className="App">
      
      <Navbar />
      <BrowserRouter>
      <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
