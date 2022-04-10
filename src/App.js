import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
const socket = socketIOClient("http://localhost:7000/");

// on leave & disconnect: if room.players.length = 0 => remove room

// limit settings (name length, password length, )
// make player limit functional
// make the game not break if started with < 2 players
// if password === true => ask for it, on success set password to false  

// User settings (Name, color, volume)

// Make kanjitori & shiritori seperate from other mdoe selections 
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode

// lobby browser

// Make server not crash if lobby doesnt exist

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


