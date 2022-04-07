import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import settings from './settingComponents.js';

const CreateLobby = ({ setId, setShowCreateRoom, socket }) => {

  let [mode, setMode] = useState("しりとり");
  let [lobbyName, setLobbyName] = useState();
  let [password, setPassword] = useState();
  let [startingWord, setStartingWord] = useState("漢字");
  let [playerLimit, setPlayerLimit] = useState(4);

  //Mode based settings
  let [turnLength, setTurnLength ] = useState(10);
  let [turnReduce, setTurnReduce ] = useState(0);
  let [leadToWin, setLeadToWin ] = useState(5);
  let [roundTime, setRoundTime] = useState(3);

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
  
  let {ModeSelect, NumberInput, TextInput} = settings;
  return (
    <div className='popup' ref={popupRef}>
      <form className='flex-container-column'>
        <ModeSelect mode={mode} setMode={setMode} />
        <TextInput state={lobbyName} setState={setLobbyName} name="lobby-name-input" label="Lobby name: " placeholder="Lobby name" />
        <TextInput state={password} setState={setPassword} name="password-input" label="Password: " placeholder="Password (optional)" />
        <TextInput state={startingWord} setState={setStartingWord} name="starting-word" label="Starting word: " placeholder="" />
        <NumberInput state={playerLimit} setState={setPlayerLimit} name="player-length-input" label="Player limit: " />
       <span>Mode settings:</span>
       {mode === "しりとり" && 
       <>
        <NumberInput state={setTurnLength} setState={setTurnLength} name="Turn length" label="Turn Length: " />
       </>
       }
       <button onClick={handleCreate} > Create Lobby</button>
      </form>
    </div>
  )
}
export default CreateLobby