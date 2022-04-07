import StairDisplay from "./StairDisplay";
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import RoomSettings from "./RoomSettings";

const Lobby = ({socket, apiUrl, id}) => {
  const [stairs, setStairs] = useState(["ロード中"])
  const [room, setRoom] = useState("dailyKanji")
  const [roomInfo, setRoomInfo] = useState()
 
  // get room on route change
  let { roomID } = useParams();
  useEffect(() => {
    if (roomID) {
      setRoom(roomID)

    //joins room based on URL OR join dailyKanji
      socket.emit("joinRoom", roomID)
    }else{
      socket.emit("joinRoom", room)
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
      console.log(data)
    })
  }, []);

  return(
    <div key={id} >
      <button onClick={() => console.log(roomInfo)} > Log roomInfo</button>
      {!roomInfo && <div> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </div>}
      {roomInfo && roomInfo.status === "active" && <StairDisplay roomInfo={roomInfo} stairs={stairs} room={room} socket={socket} />}
      {roomInfo && roomInfo.status === "waiting" && <RoomSettings socket={socket} roomInfo={roomInfo} roomID={roomID} />}
    </div>
  )
}

export default Lobby