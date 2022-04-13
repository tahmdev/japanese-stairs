import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
import Popup from './components/popup';
import LobbyBrowser from './routes/LobbyBrowser';
const socket = socketIOClient("http://localhost:7000/");

// User settings (Name, color, volume)
// Add navbar

// Make classic 100 width
// Add more  comments, write readme
// copyright thingy jmdict
// rename components
// remove create-react filed from public folder

function App() {
  const [showFull, setShowFull] = useState(false)
  const [room, setRoom] = useState("dailyKanji")
  let [id, setId] = useState()

  useEffect(() => {
    socket.on("roomFull", () => setShowFull(true))
  })

  return (
    <Router>
      <div className="App">
      {showFull && <RoomFullError setShow={setShowFull} />}
      <header>
        <Navbar setId={setId} socket={socket} />
        <button onClick={() => socket.emit("logRooms")}>LOG ROOMS</button>
      </header>
        <Routes>
          <Route path={"/"} element={<Lobby socket={socket} room={room} setRoom={setRoom} />} />
          <Route path={"/:roomID"} element={<Lobby key={id} socket={socket} room={room} setRoom={setRoom} />} />
          <Route path={"/lobbies"} element={<LobbyBrowser key={id} socket={socket} />} />
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