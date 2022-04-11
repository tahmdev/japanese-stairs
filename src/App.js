import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
const socket = socketIOClient("http://localhost:7000/");

// limit settings (name length, password length, )
// make player limit functional
// if password === true => ask for it, on success set password to false  

// Make kanjitori & shiritori seperate from other mdoe selections 
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// insta win on second round bug
// lobby browser => new api call to log rooms (not all the info, just player count, mode, name etc )
// User settings (Name, color, volume)

// Add navbar

// Add more  comments, write readme
// copyright thingy jmdict
// Fix layout in general

function App() {
  const [room, setRoom] = useState("dailyKanji")
  let [id, setId] = useState()

  return (
    <Router>
      <header>
        <Navbar setId={setId} socket={socket} />
        <button onClick={() => socket.emit("logRooms")}>LOG ROOMS</button>
      </header>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Lobby socket={socket} room={room} setRoom={setRoom} />} />
          <Route path={"/:roomID"} element={<Lobby key={id} socket={socket} room={room} setRoom={setRoom} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


