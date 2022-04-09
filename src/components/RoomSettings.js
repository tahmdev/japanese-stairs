import { useState } from "react"
import CreateEditLobby from './createLobby';

const RoomSettings = ({roomInfo, socket, roomID, setTeam}) => {
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

  const joinTeam = (team) => {
    setTeam(team)
    socket.emit("joinTeam", {roomID: roomID, team: team} )
  }

  return(
    <div className="roomSettingPage">
      {editSettings && 
      <CreateEditLobby 
        roomInfo={roomInfo}
        functions={[{func: discardSettings, name: "Discard"}, {func: saveSettings, name: "Save"}, ]} 
        setShow={setEditSettings} 
      />}
      
      <button onClick={ () => console.log(roomInfo)}> LOG ROOMINFO</button>
      <h1> {roomInfo.settings.name} </h1>

      { roomInfo.settings.mode === "漢字取" || roomInfo.settings.mode === "しりとり"
      ? <div className="mode-setting-wrapper" > 
          <div className="mode-settings" > 
            <span id="roomMode"> {roomInfo.settings.mode} </span>
            <span> Starting word: {roomInfo.red.stairs[0]} </span>
            <span> Turn length: {roomInfo.settings.turnLength}s </span>
          </div>
        </div>
      : roomInfo.settings.mode === "Team (lead)" || roomInfo.settings.mode === "漢字取 Team (lead)"
      ? <div className="mode-setting-wrapper" > 
          <div className="mode-settings" > 
            <span id="roomMode"> {roomInfo.settings.mode} </span>
            <span> Starting word: {roomInfo.red.stairs[0]} </span>
            <span> Turn length: {roomInfo.settings.turnLength}s </span>
            <span> Lead to win: {roomInfo.settings.leadToWin} </span>
          </div>
        </div>
      : <div className="mode-setting-wrapper" > 
          <div className="mode-settings" > 
            <span id="roomMode"> {roomInfo.settings.mode} </span>
            <span> Starting word: {roomInfo.red.stairs[0]} </span>
            <span> Turn length: {roomInfo.settings.turnLength}s </span>
            <span> Round length: {roomInfo.settings.roundTime}s </span>
          </div>
        </div>
      }
      
      <div className="flex-container space-between">
        <span> Players: </span>
        {socket.id === roomInfo.players[0].id && !editSettings &&
          <button onClick={() => setEditSettings(true)}>Edit settings</button>
        }
      </div>
      
      
      {
        roomInfo.settings.mode === "漢字取" || roomInfo.settings.mode === "しりとり"
        ? <ul>
            {roomInfo.players.map(player => <li key={player.id} >{player.name}</li>)}
          </ul>
        : <>
            <div className="teams-wrapper"> 
              <ul className="red-team" > 
                {roomInfo.players.map(player => player.team === "red" ? <li key={player.id} >{player.name}</li> : null)}
              </ul>
              <ul className="blue-team" >
                {roomInfo.players.map(player => player.team === "blue" ? <li key={player.id} >{player.name}</li> : null)}
              </ul>
            </div>
            <div className="team-button-wrapper">
              <button className="join-red" onClick={() => joinTeam("red")}  >Join team</button> 
              <button className="join-blue" onClick={() => joinTeam("blue")}>Join team</button> 
            </div>
          </>
      }

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