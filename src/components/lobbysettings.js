const ModeSelect = ({setMode, mode}) => {
  return(
    <div className='form-flex'>
      <label htmlFor="mode-input">Mode: </label>
      <select id="mode-input" name="mode" onChange={e => setMode(e.target.value)} value={{mode}}>
        <option>しりとり</option>
        <option>漢字とり</option>
        <option>Temp</option>
      </select>
    </div>
  )
}
const LobbyNameInput = ({lobbyName, setLobbyName}) => {
  return(
    <div className='form-flex'>
    <label htmlFor="lobbyname-input">Lobby name: </label>
    <input id="lobbyname-input" type="text" placeholder='Lobby name' name="name" onChange={e => setLobbyName(e.target.value)} value={lobbyName} />
  </div>
  )
}
const PasswordInput = ({password, setPassword}) => {
  return(
    <div className='form-flex'>
      <label htmlFor="password-input">Password: </label>
      <input id="password-input" type="text" placeholder='Password (optional)' name="password" onChange={e => setPassword(e.target.value)} value={password}/>
    </div>
  )
}
const StartingWordInput = ({startingWord, setStartingWord}) => {
  return(
    <div className='form-flex'>
      <label htmlFor="starting-word">Starting word: </label>
      <input id="starting-word" type="text" placeholder='' name="starting-word" onChange={e => setStartingWord(e.target.value)} value={startingWord}/>
    </div>
  )

}
const PlayerLimitInput = ({playerLimit, setPlayerLimit}) => {
  return(
    <div className='form-flex'>
      <label htmlFor="player-limit">Player limit: </label>
      <input id="player-limit" type="number" placeholder='' name="player-limit" onChange={e => setPlayerLimit(e.target.value)} value={playerLimit}/>
    </div>
  )
}


let settings = {LobbyNameInput, ModeSelect,  PasswordInput, StartingWordInput, PlayerLimitInput}
export default settings