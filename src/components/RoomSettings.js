import { useState } from "react"
import settings from './settingComponents.js';
import CreateEditLobby from './createLobby';

const RoomSettings = ({roomInfo, socket, roomID}) => {
  let [editSettings, setEditSettings] = useState(false)

  const startGame = () => {
    socket.emit("startGame", roomID)
  }

  const saveSettings = (settings) => {
    socket.emit("updateSettings" , {roomSettings: settings, roomID: roomID})
    setEditSettings(false)
  }

  const discardSettings = () => {
    setEditSettings(false)
  }

  return(
    <div className="roomSettingPage">
      {editSettings && 
      <CreateEditLobby 
        functions={[{func: discardSettings, name: "Discard"}, {func: saveSettings, name: "Save"}, ]} 
        setShow={setEditSettings} 
      />}
      
      <button onClick={ () => console.log(roomInfo)}> LOG ROOMINFO</button>
      <h1> {roomInfo.settings.name} </h1>

      {roomInfo.settings.mode === "しりとり" &&
        <div className="mode-setting-wrapper" > 
            <div className="mode-settings" > 
              <span id="roomMode"> {roomInfo.settings.mode} </span>
              <span> Starting word: {roomInfo.stairs[0]} </span>
              <span> Turn length: {roomInfo.settings.turnLength}s </span>
              <span> Turn reduce: {roomInfo.settings.turnReduce}s </span>
            </div>
        </div>
      }
      
      <div className="flex-container space-between">
        <span> Players: </span>
        {socket.id === roomInfo.players[0].id && !editSettings &&
          <button onClick={() => setEditSettings(true)}>Edit settings</button>
        }
        {socket.id === roomInfo.players[0].id && editSettings &&
          <div className="button-wrapper ">
            <button onClick={discardSettings}>Discard</button>
            <button onClick={saveSettings}>Save </button>
          </div>
        }
      </div>

      <ul>
      {roomInfo.players.map(player => <li key={player.id} >{player.name}</li>)}
      </ul>
      

      {/*}Host only {*/}
      {socket.id === roomInfo.players[0].id && 
      <div>
        <button onClick={startGame}>Start game</button>
      </div>}

    </div>
  )
  
}

export default RoomSettings

//add crown next to host name