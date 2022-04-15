import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const LobbyBrowser = () => {
  let [lobbyList, setLobbyList] = useState()
  
  const getLobbies = () => {
    return fetch("https://book-album.herokuapp.com/lobbyList")
    .then(res => res.json())
    .then(json => setLobbyList(json))
  }
  useEffect(() => {
    getLobbies();
  }, [])
  
  if(!lobbyList) return <div>Loading...</div>
  return(
    <div className="lobbyBrowser">
      {lobbyList.map(((item, idx) => {
        return <LobbyTemplate key={`${idx}`} lobby={item} />
      }))}
    </div>
  )
}

const LobbyTemplate = (lobby) => {
  let settings = lobby.lobby.settings
  const navigate = useNavigate();

  const joinLobby = (id) => {
    navigate(`/${id}`);
  }

  return (
    <div className="lobbyTemplate">
      <h1> {settings.name} </h1>
      <span> {settings.type} </span>
      <span> {settings.mode} </span>
      {settings.mode === "Classic" && lobby.lobby.id !== "dailyKanji" && lobby.lobby.id !== "dailyShiritori" &&
      <>
        <span>Turn time: {settings.turnLength}s</span>
      </>}
      {settings.mode === "Team (lead)" && 
      <>
        <span>Turn time: {settings.turnLength}s</span>
        <span>Lead to win: {settings.leadToWin} </span>
      </>}
      {settings.mode === "Team (time)" && 
      <>
        <span>Turn time: {settings.turnLength}s</span>
        <span>Round time: {settings.roundTime}s </span>
      </>}
      <span> {lobby.lobby.players.length}/{settings.playerLimit} players </span>
      <span> {lobby.lobby.status === "active" ? "In-game" : "In lobby"} </span>
      <button className="join-btn" onClick={() => joinLobby(lobby.lobby.id)}>Join </button>
    </div>
  )
}
export default LobbyBrowser