import StairDisplay from "./StairDisplay";
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import RoomSettings from "./RoomSettings";
import ScoreReport from "./ScoreReport";

const Lobby = ({socket, id, room, setRoom}) => {
  let {roomID} = useParams();
  const [stairs, setStairs] = useState(["ロード中"])
  const [roomInfo, setRoomInfo] = useState()
  let [showScore, setShowScore] = useState()
  let [score, setScore] = useState()
  // get room on route change
  useEffect(() => {
    console.log(room)
    console.log("LEAVING NOW", roomID)
    socket.emit("leaveRoom", room)
    if (roomID) {
      setRoom(roomID)

    //joins room based on URL OR join dailyKanji
      socket.emit("joinRoom", {roomID: roomID, playerName: Math.random() > 0.5 ? "LONG NAME HERE" : "short"})
    }else{
      socket.emit("joinRoom", {roomID: "dailyKanji", playerName: "name here"})
      setRoom("dailyKanji")
    }
  }, [roomID]) 

  // update stairs and room info via websocket
  useEffect(() => {
    socket.on("newMessage", data => {
      setStairs(data);
    })
    socket.on("newRoomInfo", data => {
      setRoomInfo(data)
      //set initial values
      setStairs([...data.stairs])
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
      <button onClick={() => console.log(roomInfo)} > Log roomInfo</button>
      <button onClick={() => console.log(room)} > Log CURRENT ROOM</button>
      {!roomInfo && <div> This lobby does not exist </div>}
      {roomInfo && roomInfo.status === "active" && <StairDisplay roomInfo={roomInfo} stairs={stairs} room={room} socket={socket} />}
      {roomInfo && roomInfo.status === "waiting" && <RoomSettings socket={socket} roomInfo={roomInfo} roomID={roomID} />}
      {showScore && <ScoreReport data={score} setShowScore={setShowScore} />}
    </div>
  )
}

export default Lobby