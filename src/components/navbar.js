import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEditLobby from './createLobby';
import UserSettings from './userSettings'; 

const Navbar = ({setId, socket, userSettings, setUserSettings}) => {
  let [showCreateRoom, setShowCreateRoom] = useState(false)
  let [showUserSettings, setShowUserSettings] = useState(false)
  const navigate = useNavigate();
  
  const createRoom = (settings) => {
    let id ="";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < 16; i++){
      id += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    setId(id)
    socket.emit("createRoom", {roomSettings: settings, id: id})
    navigate(`/${id}`);
  }
  return(
    <nav>
      <div className='nav-flex'>
        <button onClick={() => setShowCreateRoom(true)}>Create Room </button>
        <a href='/lobbies'>Lobbies</a>
        <button onClick={() => setShowUserSettings(true)} >Settings</button>
        {showCreateRoom && <CreateEditLobby functions={[{func: createRoom, name: "Create room"}]} setShow={setShowCreateRoom}  /> }
        {showUserSettings && <UserSettings setShow={setShowUserSettings} userSettings={userSettings} setUserSettings={setUserSettings} /> }
      </div>
    </nav>
  )
}

export default Navbar