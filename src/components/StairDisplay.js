import MagicInput from './magicInput';
import { useEffect, useState } from 'react';

let apiUrl = "http://localhost:9000/stairs/"

const StairDisplay = ({ socket, stairs, room, roomInfo, team, enemy, userSettings, classic}) => {
  const [length, setLength] = useState([])
  const [height, setHeight] = useState([])
  const [currentInput, setCurrentInput] = useState("")

  // Determine position of next word 
  useEffect(() => {
    let newLength = [0]
    let newHeight = [0]
    stairs.map((word, idx) => {
      if (idx % 2 === 0 ){
        newLength = [...newLength, newLength.at(-1) + (word.length - 1) ]
        newHeight = [...newHeight, newHeight.at(-1)]
      }else{
        newLength = [...newLength, newLength.at(-1)]
        newHeight = [...newHeight, newHeight.at(-1) + (word.length - 1) ]
      }
    })
    setLength(newLength)
    setHeight(newHeight)
  }, [stairs])

  // send data to server if word exists
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      
      let cleanInput = currentInput.replace(/\s/g, "")
      if (cleanInput){
        fetch(`${apiUrl}jishoKanji/${cleanInput}/${roomInfo.settings.type}`) 
        .then(res => res.json())
        .then(json => {
          if (json){
            socket.emit("sendMessage", {word: cleanInput, room: room, team: team})
          }else{
            console.log("not a real word")
          }
        })
        setCurrentInput("")
      }
    }
  }

  // Check for "enter" input
  useEffect(() => {
    
    document.addEventListener("keydown", handleEnter)
    return () => {
      document.removeEventListener("keydown", handleEnter)
    }
  }, [currentInput])
  
  // keep input on screen
  useEffect(() => {
    let stairElement = document.getElementById("magic-output").parentNode
    stairElement.scrollTop = stairElement.scrollHeight; // - 50% height
  }, [stairs, currentInput])

  const stairStyle = {
    height: `${height.at(-1) + 6}rem`,
    maxWidth: classic ? "100vw" : null,
    MozTransform: enemy ? "scale(-1, 1)" : null,
    WebkitTransform: enemy ? "scale(-1, 1)": null,
    OTransform: enemy ? "scale(-1, 1)": null,
    MsTransform: enemy ? "scale(-1, 1)": null,
    transform: enemy ? "scale(-1, 1)": null,
  }

  const wordStyle = {
    color: enemy ? "transparent" : userSettings.color,
    backgroundColor: userSettings.background,
    pointerEvents: enemy ? "none" : null
  }
  
  return (
    <div className={`${team} ${classic ? null : "team"}`} >
      {roomInfo.id !== "dailyKanji" && roomInfo.id !== "dailyShiritori" && <span className='current-turn-timer'> {roomInfo[team].currentTurn} </span>}
      {roomInfo.id !== "dailyKanji" && roomInfo.id !== "dailyShiritori" && <div className='order-display'>
        <p className='order-name' key={roomInfo[team].order.at(0).name + "1"} > {roomInfo[team].order.at(-1).name} </p>
        <p className='order-name' key={roomInfo[team].order.at(0).name + "2"} > {roomInfo[team].order.at(0).name} </p>
        <p className='order-name' key={roomInfo[team].order.at(0).name + "3"} > {roomInfo[team].order.length > 1 ? roomInfo[team].order.at(1).name : roomInfo[team].order.at(0).name} </p>
      </div>}
      <div className='stairs' style={ stairStyle } >
        {stairs.map((word, idx) => {
          return(
            <div 
            key={`${word} ${idx}`} 
            style={{left: `${length[idx]}rem`, top: `${height[idx]}rem`, ...wordStyle}}
            className={`word word${idx} ${idx % 2 === 0 ? "horizontal" : "vertical"}`}> 
            {word} 
            </div>
          )
        })}

        {stairs.length % 2 === 0 && 
        <MagicInput 
          inputClass={`horizontal-input ${
            roomInfo.id === "dailyKanji" 
            ? null 
            : roomInfo.id === "dailyShiritori" 
            ? null 
            : roomInfo[team].order.at(0).id === socket.id 
            ? null 
            : "hidden"}
          `} 
          setCurrentInput={setCurrentInput} 
          text={currentInput} 
          position={{left: `${length.at(-1) + 1}rem`, top: `${height.at(-1)}rem`}} 
        />}
        {stairs.length % 2 !== 0 && 
        <MagicInput 
          outputClass={`vertical-output `} 
          inputClass={`vertical-input ${
            roomInfo.id === "dailyKanji" 
            ? null 
            : roomInfo.id === "dailyShiritori" 
            ? null 
            : roomInfo[team].order.at(0).id === socket.id 
            ? null 
            : "hidden"}
          `}
          setCurrentInput={setCurrentInput} 
          text={currentInput} 
          position={{left: `${length.at(-1)}rem`, top: `${height.at(-1) + 1}rem`}} 
        />}
        {!enemy && <div className='info' style={{left: `${length.at(-1) }rem`, top: `${height.at(-1) + 1 }rem`}}> Enter a word that starts with {stairs.at(-1).slice(-1)} </div>}
      </div>
    </div>
      
  )
}

export default StairDisplay