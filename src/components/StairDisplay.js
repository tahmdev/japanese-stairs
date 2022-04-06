import MagicInput from './magicInput';
import { useEffect, useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';

let apiUrl = "http://localhost:9000/stairs/"

const StairDisplay = ({stairs, setStairs, socket}) => {
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

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      
      let cleanInput = currentInput.replace(/\s/g, "")

      fetch(apiUrl + "jishoKanji/" + cleanInput)
      .then(res => res.json())
      .then(json => {
        if (json){
              socket.emit("dailyKanji", cleanInput)
        }else{
          console.log("not a real word")
        }
      })
      setCurrentInput("")
    }
  }

  useEffect(() => {
    // keep input on screen
    document.getElementById("magic-output").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    
    document.addEventListener("keydown", handleEnter)
    return () => {
      document.removeEventListener("keydown", handleEnter)
    }
  }, [currentInput])

  const apiTest = () => {
    console.log("testing")
    fetch(apiUrl + `kanji/${currentInput.replace(/\s/g, "")}/stairsdaily/userName`, {method: "POST"})
    .then(res => res.json())
    .then(json => console.log(json))
  }

  const test =() => {
    let re = new RegExp(/^[\u4e00-\u9faf\u3400-\u4dbf]+$/, "g")
    let owo = "供物"
    console.log(re.test(owo))
  }

  return (
    <div className='stairs'>
      <button onClick={apiTest}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</button>
      <button onClick={test}>22222222222222222222222222222</button>
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
      {stairs.length % 2 === 0 &&  <MagicInput inputClass="horizontal-input" setCurrentInput={setCurrentInput} text={currentInput} position={{left: `${length.at(-1) + 1}rem`, top: `${height.at(-1)}rem`}} />}
      {stairs.length % 2 !== 0 &&  <MagicInput outputClass="vertical-output"  inputClass="vertical-input" setCurrentInput={setCurrentInput} text={currentInput} position={{left: `${length.at(-1)}rem`, top: `${height.at(-1) + 1}rem`}} />}
      <div className='info' style={{left: `${length.at(-1) }rem`, top: `${height.at(-1) + 1 }rem`}}> Enter a word that starts with {stairs.at(-1).slice(-1)} </div>
    </div>
  )
}

export default StairDisplay