import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import settings from './lobbysettings.js';

const CreateLobby = ({ setId, setShowCreateRoom, socket }) => {

  let [mode, setMode] = useState("しりとり");
  let [lobbyName, setLobbyName] = useState();
  let [password, setPassword] = useState();
  let [startingWord, setStartingWord] = useState("漢字");
  let [playerLimit, setPlayerLimit] = useState(4);

  let popupRef = React.createRef();

  const navigate = useNavigate();
  
  const handleCreate = (e) => {
    e.preventDefault();

    let id ="";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < 16; i++){
      id += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    let roomSettings = {
      id: id,
      mode: mode,
      name: lobbyName,
      password: password,
      startingWord: startingWord,
      playerLimit: playerLimit
    }
    setShowCreateRoom(false)
    setId(id)
    socket.emit("createRoom", roomSettings)
    navigate(`/${id}`);
  }

  useEffect(() => {
    document.addEventListener("mousedown", hidePopup)
    return () => {
      document.removeEventListener("mousedown", hidePopup)
    }
  }, [])

  const hidePopup = (e) => {
    if (!popupRef.current.contains(e.target)){
      setShowCreateRoom(false)
    }
  }
  
  let {ModeSelect, LobbyNameInput, PasswordInput, StartingWordInput, PlayerLimitInput} = settings;
  console.log(ModeSelect)
  console.log(LobbyNameInput)
  return (
    <div className='popup' ref={popupRef}>
      <form className='flex-container-column'>
        <ModeSelect mode={mode} setMode={setMode} />
        <LobbyNameInput lobbyName={lobbyName} setLobbyName={setLobbyName} />
        <PasswordInput password={password} setPassword={setPassword} />
        <StartingWordInput startingWord={startingWord} setStartingWord={setStartingWord} />
        <PlayerLimitInput playerLimit={playerLimit} setPlayerLimit={setPlayerLimit} />
       <button onClick={handleCreate} > Create Lobby</button>
      </form>
    </div>
  )
}
export default CreateLobby