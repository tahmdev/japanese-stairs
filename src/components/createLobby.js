import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import settings from './settingComponents.js';

const CreateEditLobby = ({ setShow, functions, roomInfo }) => {
 
  let [mode, setMode] = useState(roomInfo ? roomInfo.settings.mode : "漢字取");
  let [lobbyName, setLobbyName] = useState(roomInfo ? roomInfo.settings.name : "");
  let [password, setPassword] = useState(roomInfo ? roomInfo.settings.password : "");
  let [startingWord, setStartingWord] = useState(roomInfo ? roomInfo.red.stairs[0] :"漢字");
  let [playerLimit, setPlayerLimit] = useState(roomInfo ? roomInfo.settings.playerLimit : 4);
  //Mode based settings
  let [turnLength, setTurnLength ] = useState(roomInfo ? roomInfo.settings.turnLength : 15);
  let [leadToWin, setLeadToWin ] = useState(roomInfo ? roomInfo.settings.leadToWin : 5);
  let [roundTime, setRoundTime] = useState(roomInfo ? roomInfo.settings.roundTime : 120);

  let popupRef = React.createRef();
  
  const handleClick = (e, func) => {
    e.preventDefault();
    let roomSettings = {
      mode: mode,
      name: lobbyName,
      password: password,
      startingWord: startingWord,
      playerLimit: playerLimit,
      turnLength: turnLength,
      leadToWin: leadToWin,
      roundTime: roundTime,
    }
    setShow(false)
    func(roomSettings)
  }

  useEffect(() => {
    document.addEventListener("mousedown", hidePopup)
    return () => {
      document.removeEventListener("mousedown", hidePopup)
    }
  }, [mode, lobbyName, password, startingWord, playerLimit, turnLength, roundTime, leadToWin])

  const hidePopup = (e) => {
    if (!popupRef.current.contains(e.target)){
      setShow(false)
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
       {
         mode === "しりとり" || mode === "漢字取"
         ?  <>
              <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
            </>
        : mode === "Team (lead)" || mode === "漢字取 Team (lead)"
        ?   <>
              <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
              <NumberInput state={leadToWin} setState={setLeadToWin} name="lead-to-win" label="Lead to win: " />
            </>
        : <>
              <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
              <NumberInput state={roundTime} setState={setRoundTime} name="round-time" label="Round time: " />
          </>
       }
       <div className='edit-create-button-wrapper'>
        {functions.map(item => {
          return(
            <button 
              key={item.name} 
              onClick={e => handleClick(e, item.func)}> 
              {item.name} 
            </button>
          )
        })}
       </div>
      </form>
    </div>
  )
}
export default CreateEditLobby