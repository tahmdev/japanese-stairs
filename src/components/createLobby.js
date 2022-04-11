import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import settings from './settingComponents.js';
import Popup from './popup.js';

const CreateEditLobby = ({ setShow, functions, roomInfo }) => {
 
  let [type, setType] = useState(roomInfo ? roomInfo.settings.type : "しりとり")
  let [mode, setMode] = useState(roomInfo ? roomInfo.settings.mode : "Classic");
  let [lobbyName, setLobbyName] = useState(roomInfo ? roomInfo.settings.name : "");
  let [password, setPassword] = useState(roomInfo ? roomInfo.settings.password : "");
  let [startingWord, setStartingWord] = useState(roomInfo ? roomInfo.red.stairs[0] : "しりとり");
  let [playerLimit, setPlayerLimit] = useState(roomInfo ? roomInfo.settings.playerLimit : 4);
  let [turnLength, setTurnLength ] = useState(roomInfo ? roomInfo.settings.turnLength : 15);
  let [leadToWin, setLeadToWin ] = useState(roomInfo ? roomInfo.settings.leadToWin : 5);
  let [roundTime, setRoundTime] = useState(roomInfo ? roomInfo.settings.roundTime : 120);
  
  const handleClick = (e, func) => {
    e.preventDefault();
    let roomSettings = {
      type: type,
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

  let {SelectInput, NumberInput, TextInput} = settings;
  return (
    <Popup classes="popup" setShow={setShow}>
      <form className='flex-container-column'>
        <SelectInput state={type} setState={setType} options={["しりとり", "漢字取"]} name="mode-select-input" label="Mode: " />
        <SelectInput state={mode} setState={setMode} options={["Classic", "Team (lead)", "Team (time)"]} name="mode-select-input" label="Mode: " />
        <TextInput state={lobbyName} setState={setLobbyName} name="lobby-name-input" label="Lobby name: " placeholder="Lobby name" />
        <TextInput state={password} setState={setPassword} name="password-input" label="Password: " placeholder="Password (optional)" />
        <TextInput state={startingWord} setState={setStartingWord} name="starting-word" label="Starting word: " placeholder="" />
        <NumberInput state={playerLimit} setState={setPlayerLimit} name="player-length-input" label="Player limit: " />
       <span>Mode settings:</span>
       {
         mode === "Classic"
         ?  <>
              <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
            </>
        : mode === "Team (lead)"
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
    </Popup>
  )
}
export default CreateEditLobby