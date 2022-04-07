import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
const socket = socketIOClient("http://localhost:7000/");

// Next steps: 


//Single player zen mode with localstorage
// Multiplayer modes:
//  1v1 + 2v2, 
// Going in circle
//  Time based + lead based
// All of the above with shiritori

// limit settings (name length, password length)

// Limit settings max length

// Finish game by setting to waiting + popup results
// Add turns (should also fix only allowing to join the game between rounds)
// Make game respect settings
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// Make password functional
// Make game reset every 24 hours 
// style scrollbar

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


