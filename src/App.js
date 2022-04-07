import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import socketIOClient from "socket.io-client";
import StairDisplay from './components/StairDisplay';
import { useNavigate } from 'react-router-dom';
import Lobby from './components/lobby';

const socket = socketIOClient("http://localhost:7000/");

// SETTINGS, WEBSOCKET, PVP
// Next steps: 

// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// Make game reset every 24 hours 

//Single player zen mode

// Multiplayer modes:
//  1v1 + 2v2, 
// Going in circle
//  Time based + lead based

// All of the above with shiritori

let apiUrl = "http://localhost:9000/stairs/"

function App() {
  let [id, setId] = useState()

  return (
    <Router>
      <header>
        <div>Navbar here</div>
        {<CreateLobby socket={socket} setId={setId} /> }
      </header>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Lobby socket={socket} apiUrl={apiUrl} />} />
          <Route path={"/:roomID"} element={<Lobby key={id} socket={socket} apiUrl={apiUrl} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


const CreateLobby = ({ setId }) => {
  const navigate = useNavigate();
  
  const handleCreate = () => {
    let id ="";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
    for (let i = 0; i < 16; i++){
      id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setId(id)
    socket.emit("createRoom", id)
    navigate(`/${id}`);
  }
  return (
    <div>
     <button onClick={handleCreate}> Create Lobby</button>
    </div>
  )
}
// Create lobby => redirect to lobby(which hasnt started) 