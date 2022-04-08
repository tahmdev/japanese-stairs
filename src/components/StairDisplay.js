import MagicInput from './magicInput';
import { useEffect, useState } from 'react';

let apiUrl = "http://localhost:9000/stairs/"

const StairDisplay = ({ socket, stairs, room, roomInfo}) => {
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

      fetch(apiUrl + "jishoKanji/" + cleanInput)
      .then(res => res.json())
      .then(json => {
        if (json){
          socket.emit("sendMessage", {word: cleanInput, room: room})
        }else{
          console.log("not a real word")
        }
      })
      setCurrentInput("")
    }
  }

  // Check for "enter" input
  useEffect(() => {
    // keep input on screen
    document.getElementById("magic-output").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    
    document.addEventListener("keydown", handleEnter)
    return () => {
      document.removeEventListener("keydown", handleEnter)
    }
  }, [currentInput])

  return (
    <div>
      <span> {roomInfo.currentTurn} </span>
      {roomInfo.id !== "dailyKanji" && roomInfo.id !== "dailyShiritori" && <div className='order-display'>
        <p className='order-name' key={roomInfo.order.at(0).name + "1"} > {roomInfo.order.at(-1).name} </p>
        <p className='order-name' key={roomInfo.order.at(0).name + "2"} > {roomInfo.order.at(0).name} </p>
        <p className='order-name' key={roomInfo.order.at(0).name + "3"} > {roomInfo.order.length > 1 ? roomInfo.order.at(1).name : roomInfo.order.at(0).name} </p>
      </div>}
      <div className='stairs'>
        {stairs.map((word, idx) => {
          return(
            <div 
            key={`${word} ${idx}`} 
            style={{left: `${length[idx]}rem`, top: `${height[idx]}rem`}}
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
            : roomInfo.order.at(0).id === socket.id 
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
            : roomInfo.order.at(0).id === socket.id 
            ? null 
            : "hidden"}
          `}
          setCurrentInput={setCurrentInput} 
          text={currentInput} 
          position={{left: `${length.at(-1)}rem`, top: `${height.at(-1) + 1}rem`}} 
        />}
        <div className='info' style={{left: `${length.at(-1) }rem`, top: `${height.at(-1) + 1 }rem`}}> Enter a word that starts with {stairs.at(-1).slice(-1)} </div>
      </div>
    </div>
      
  )
}

export default StairDisplay