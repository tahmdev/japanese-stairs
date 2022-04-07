import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import CreateLobby from './components/createLobby';
const socket = socketIOClient("http://localhost:7000/");

// Next steps: 


//Single player zen mode with localstorage
// Multiplayer modes:
//  1v1 + 2v2, 
// Going in circle
//  Time based + lead based
// All of the above with shiritori

// limit settings (name length, password length)

//Fill out rest of settings / modes

// Add turns (should also fix only allowing to join the game between rounds)
// Make game respect settings
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// Make password functional
// Make game reset every 24 hours 
// style scrollbar

function App() {
  let [id, setId] = useState()
  let [showCreateRoom, setShowCreateRoom] = useState(false)
  const [room, setRoom] = useState("dailyKanji")

  return (
    <Router>
      <header>
        <div>Navbar here</div>
        <button onClick={() => socket.emit("logRooms")}>LOG ROOMS</button>
        <button onClick={() => setShowCreateRoom(true)}> Show Create Room </button>
        {showCreateRoom && <CreateLobby socket={socket} setId={setId} setShowCreateRoom={setShowCreateRoom}  /> }
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


