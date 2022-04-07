const RoomSettings = ({roomInfo, socket, roomID}) => {

  const startGame = () => {
    socket.emit("startGame", roomID)
  }

  return(
    <div className="roomSettingPage">
      <h1> {roomInfo.settings.name} </h1>
      <span id="roomMode"> {roomInfo.settings.mode} </span>
      
      {roomInfo.settings.mode === "しりとり" &&
        <div className="roomSettingsDisplay" > 
          YEP SHIRITORI
        </div>
      }

      <span> Players: </span>
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