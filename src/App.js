import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import Lobby from './components/lobby';
import Navbar from './components/navbar';
import Popup from './components/popup';
import LobbyBrowser from './routes/LobbyBrowser';
import useLocalstorage from "./hooks/useLocalstorage.js"

const socket = socketIOClient("wss://shiritori-stairs.herokuapp.com");

function App() {
  let [showFull, setShowFull] = useState(false)
  let [room, setRoom] = useState("dailyKanji")
  let [userSettings, setUserSettings] = useLocalstorage("settings", {
    name: "anonymous",
    color: "#FFFFFF",
    background: "#000000",
  })
  let [id, setId] = useState()

  useEffect(() => {
    socket.on("roomFull", () => setShowFull(true))
  })

  return (
    <Router>
      <div className="App">
      {showFull && <RoomFullError setShow={setShowFull} />}
      <header>
        <Navbar setId={setId} socket={socket} userSettings={userSettings} setUserSettings={setUserSettings} />
      </header>
        <Routes>
          <Route path={"/"} element={<Lobby socket={socket} room={room} setRoom={setRoom} />} />
          <Route path={"/:roomID"} element={<Lobby key={id} socket={socket} room={room} setRoom={setRoom} userSettings={userSettings} />} />
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