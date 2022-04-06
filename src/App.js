import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Home from "./routes/Home.js"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:7000/");

// SETTINGS, WEBSOCKET, PVP
// Next steps: 

// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// Make game reset every 24 hours 
// Multiplayer 
//  1v1 + 2v2, 
//  Time based + lead based

// All of the above with shiritori

let apiUrl = "http://localhost:9000/stairs/"

function App() {

  return (
    <Router>
      <header>
        <div>Navbar here</div>
      </header>
      <div className="App">
        <Routes>
          <Route key="a" path={"/"} element={<Home socket={socket}/>} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;


