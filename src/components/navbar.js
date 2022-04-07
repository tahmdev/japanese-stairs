import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEditLobby from './createLobby';

const Navbar = ({setId, socket}) => {
  let [showCreateRoom, setShowCreateRoom] = useState(false)
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
      <button onClick={() => setShowCreateRoom(true)}> Show Create Room </button>
      {showCreateRoom && <CreateEditLobby functions={[{func: createRoom, name: "Create room"}]} setShow={setShowCreateRoom}  /> }
    </nav>
  )
}

export default Navbar