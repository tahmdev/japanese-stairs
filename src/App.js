import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
const socket = socketIOClient("http://localhost:7000/");

// Modes: 
// limit settings (name length, password length, )

// Add timer to Team(time)
// Fix layout in general

// Make kanjitori & shiritori seperate from other mdoe selections 
// if password === true => ask for it, on success set password to false  
// Edit settings starting word validation <= Didn't I add this already?
// User settings (Name, color, volume)
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// fix daily kanji
// make screen focused on bottom right 
// lobby browser

// EZ Stuff:
// only start with at least 2 players (and at least 1 in each team)
// Make server not crash if lobby doesnt exist
// Make daily games reset every 24 hours (probably gonna happen anyway due to heroku restarting) 
// style scrollbar
// Add more  comments, write readmes
// copyright thingy jmdict
//hover z index

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


