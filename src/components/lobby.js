import StairDisplay from "./StairDisplay";
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import WaitingLobby from "./waitingLobby";
import ScoreReport from "./ScoreReport";
import VersusScoreDisplay from "./VersusScoreDisplay";

const Lobby = ({socket, id, room, setRoom, userSettings}) => {
  let {roomID} = useParams();
  const [redStairs, setRedStairs] = useState(["ロード中"])
  const [blueStairs, setBlueStairs] = useState(["ロード中"])
  const [roomInfo, setRoomInfo] = useState()
  let [showScore, setShowScore] = useState()
  let [score, setScore] = useState()
  let [team, setTeam] = useState("red")

  // get room on route change
  useEffect(() => {
    socket.emit("leaveRoom", room)
    if (roomID) {
      setRoom(roomID)

    //joins room based on URL OR join dailyKanji
      socket.emit("joinRoom", {roomID: roomID, playerName: userSettings.name})
    }else{
      socket.emit("joinRoom", {roomID: "dailyKanji", playerName: "userSettings.name"})
      setRoom("dailyKanji")
    }
  }, [roomID]) 

  // update stairs and room info via websocket
  useEffect(() => {
    socket.on("newMessage", ({data, team}) => {
      if (team === "red") setRedStairs(data)
      if (team === "blue") setBlueStairs(data)
    })
    socket.on("newRoomInfo", data => {
      setRoomInfo(data)
      //set initial values
      setRedStairs(data.red.stairs)
      setBlueStairs(data.blue.stairs)
    })
    socket.on("scoreReport", data => {
      setScore(data)
    })
  }, []);

  useEffect(() => {
    if(score) setShowScore(true)
  }, [score])

  return(
    <div key={id} >
      {!roomInfo && <div> This lobby does not exist </div>}
      {roomInfo && roomInfo.status === "active" && roomInfo.settings.mode === "Team (time)" && <div className="current-turn-timer"> {roomInfo.currentRound} </div> }
      {roomInfo && roomInfo.status === "active" && 
        <div className="game-screen">
          {roomInfo.settings.mode !== "Team (lead)" && roomInfo.settings.mode !== "Team (time)"
          ? <StairDisplay roomInfo={roomInfo} stairs={redStairs} room={room} socket={socket} team="red" userSettings={userSettings} classic={true} />
          
          // Always render own team first and hide enemy teams words 
          : team === "red"
          ? <>
            <StairDisplay roomInfo={roomInfo} stairs={redStairs} room={room} socket={socket} team="red" userSettings={userSettings}/> 
            <VersusScoreDisplay roomInfo={roomInfo} team={team}/>
            <StairDisplay roomInfo={roomInfo} stairs={blueStairs} room={room} socket={socket} team="blue" enemy={true} userSettings={userSettings}/>
            </>
          : <>
              <StairDisplay roomInfo={roomInfo} stairs={blueStairs} room={room} socket={socket} team="blue" userSettings={userSettings}/>
              <VersusScoreDisplay roomInfo={roomInfo} team={team}/>
              <StairDisplay roomInfo={roomInfo} stairs={redStairs} room={room} socket={socket} team="red" enemy={true} userSettings={userSettings}/> 
            </>
          }
        </div>
      }
      {roomInfo && roomInfo.status === "waiting" && <WaitingLobby socket={socket} roomInfo={roomInfo} roomID={roomID} setTeam={setTeam} />}
      {showScore && <ScoreReport data={score} roomInfo={roomInfo} setShowScore={setShowScore} />}
    </div>
  )
}

export default Lobby