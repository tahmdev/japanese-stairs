import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
const socket = socketIOClient("http://localhost:7000/");

// Modes: 
//Single player zen mode with localstorage
// Multiplayer modes:
// DEFAULT: Going in circle
// Team Time based + lead based

// limit settings (name length, password length, )

// Add turns (should also fix only allowing to join the game between rounds)
// Make game respect settings

// Finish game by setting to waiting + popup results
// Make password functional
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// CHECK IF STARTS WITH LAST OF PREVIOUS WORD 
// Zoom buttons on bottom left
// User settings (Name, color, volume)

// EZ Stuff:
// Make daily games reset every 24 hours (probably gonna happen anyway due to heroku restarting) 
// style scrollbar
// Add more  comments, write readmes
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


