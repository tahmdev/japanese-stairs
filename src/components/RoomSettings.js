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

  const checkTeamLengths = () => {
    let red = document.getElementById("red-team")
    let blue = document.getElementById("blue-team")
    if (red && blue){
      if (red.hasChildNodes() && blue.hasChildNodes()) return true
      else return false
    }
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

      { roomInfo.settings.mode === "Classic"
      ? <div className="mode-setting-wrapper" > 
          <div className="mode-settings" > 
            <span id="roomMode"> {roomInfo.settings.mode} </span>
            <span> Starting word: {roomInfo.red.stairs[0]} </span>
            <span> Turn length: {roomInfo.settings.turnLength}s </span>
          </div>
        </div>
      : roomInfo.settings.mode === "Team (lead)"
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
        roomInfo.settings.mode === "Classic"
        ? <ul>
            {roomInfo.players.map(player => <li key={player.id} >{player.name}</li>)}
          </ul>
        : <>
            <div className="teams-wrapper"> 
              <ul id="red-team" className="red-team" > 
                {roomInfo.players.map(player => player.team === "red" ? <li key={player.id} >{player.name}</li> : null)}
              </ul>
              <ul id="blue-team" className="blue-team" >
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

        <button onClick={() => console.log(checkTeamLengths())}> LOG TEAMS</button>
        <button 
          onClick={startGame} 
          disabled={roomInfo.settings.mode === "Team (lead)" || roomInfo.settings.mode === "Team (time)" ? !checkTeamLengths() : false}
        >Start game</button>
      </div>}
    </div>
  )
}

export default RoomSettings

//add crown next to host name