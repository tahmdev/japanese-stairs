const RoomSettings = ({roomInfo, socket, roomID}) => {

  const startGame = () => {
    socket.emit("startGame", roomID)
  }

  return(
    <div>
      {roomInfo.players.map(item => <p>{item}</p>)}
      {socket.id === roomInfo.players[0] && 
      <div>
        <button onClick={startGame}>Start game</button> 
      </div>}
    </div>
  )
  
}

export default RoomSettings