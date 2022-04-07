import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import settings from './settingComponents.js';

const CreateEditLobby = ({ setShow, functions }) => {

  let [mode, setMode] = useState("しりとり");
  let [lobbyName, setLobbyName] = useState("");
  let [password, setPassword] = useState("");
  let [startingWord, setStartingWord] = useState("漢字");
  let [playerLimit, setPlayerLimit] = useState(4);

  //Mode based settings
  let [turnLength, setTurnLength ] = useState(10);
  let [turnReduce, setTurnReduce ] = useState(0);
  let [leadToWin, setLeadToWin ] = useState(5);
  let [roundTime, setRoundTime] = useState(3);

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
      turnReduce: turnReduce,
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
  }, [mode, lobbyName, password, startingWord, playerLimit, turnLength, turnReduce, roundTime, leadToWin])

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
       {mode === "しりとり" && 
       <>
        <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
        <NumberInput state={turnReduce} setState={setTurnReduce} name="turn-reduce" label="Reduce per turn: " />
       </>
       }
       {mode === "Team (lead)" &&
        <>
          <NumberInput state={turnLength} setState={setTurnLength} name="turn-length" label="Turn Length: " />
          <NumberInput state={leadToWin} setState={setLeadToWin} name="lead-to-win" label="Lead to win: " />
        </>
       }
       {
         mode === "Team (time)" &&
         <>
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