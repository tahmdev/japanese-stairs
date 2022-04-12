import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
import Popup from './components/popup';
const socket = socketIOClient("http://localhost:7000/");

// lobby browser => new api call to log rooms (not all the info, just player count, mode, name etc )
// User settings (Name, color, volume)
// Server crash on start non existent room

// Add navbar

// Add more  comments, write readme
// copyright thingy jmdict
// Fix layout in general
// rename components
function App() {
  const [showFull, setShowFull] = useState(false)
  const [room, setRoom] = useState("dailyKanji")
  let [id, setId] = useState()

  useEffect(() => {
    socket.on("roomFull", () => setShowFull(true))
  })

  return (
    <Router>
      {showFull && <RoomFullError setShow={setShowFull} />}
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


const RoomFullError = ({setShow}) => {

  return(
    <Popup classes="popup" setShow={setShow}>
      <span style={{color: "black"}} > The room you tried to join is full </span>
    </Popup>
  )
}