import StairDisplay from "./StairDisplay";
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import RoomSettings from "./RoomSettings";

const Lobby = ({socket, id, room, setRoom}) => {
  let {roomID} = useParams();
  const [stairs, setStairs] = useState(["ロード中"])
  const [roomInfo, setRoomInfo] = useState()
 
  // get room on route change
  useEffect(() => {
    console.log(room)
    console.log("LEAVING NOW", roomID)
    socket.emit("leaveRoom", room)
    if (roomID) {
      setRoom(roomID)

    //joins room based on URL OR join dailyKanji
      socket.emit("joinRoom", {roomID: roomID, playerName: "name 2"})
    }else{
      socket.emit("joinRoom", {roomID: room, playerName: "name here"})
    }
  }, [roomID]) 

  // update stairs and room info via websocket
  useEffect(() => {
    socket.on("newMessage", data => {
      setStairs(data);
    })
    socket.on("newRoomInfo", data => {
      setRoomInfo(data)
      setStairs([...data.stairs])
    })
  }, []);

  return(
    <div key={id} >
      <button onClick={() => console.log(roomInfo)} > Log roomInfo</button>
      <button onClick={() => console.log(room)} > Log CURRENT ROOM</button>
      {!roomInfo && <div> This lobby does not exist </div>}
      {roomInfo && roomInfo.status === "active" && <StairDisplay roomInfo={roomInfo} stairs={stairs} room={room} socket={socket} />}
      {roomInfo && roomInfo.status === "waiting" && <RoomSettings socket={socket} roomInfo={roomInfo} roomID={roomID} />}
    </div>
  )
}

export default Lobby