import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import NavBar from './components/NavBar';

function App() {
  return (
   <Router>
   <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
   <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </div>
   </Router>
  );
}

export default App;
