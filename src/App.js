import { useEffect, useState } from 'react';
import './App.css';
import MagicInput from './components/magicInput';

// SETTINGS, WEBSOCKET, PVP

function App() {
  const [stairs, setStairs] = useState(["育児","児童文学","学園","園庭", "庭中", "中学校", "校門", "門粒" ])

  return (
    <div className="App">
      <StairDisplay stairs={stairs} setStairs={setStairs}/>
    </div>
  );
}

export default App;

let apiUrl = "http://localhost:9000/stairs/"

const StairDisplay = ({stairs, setStairs}) => {
  const [length, setLength] = useState([])
  const [height, setHeight] = useState([])
  const [currentInput, setCurrentInput] = useState("")

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
      if (stairs.at(-1).at(-1)  === currentInput.replace(/\s/g, "").at(0) && !stairs.includes(currentInput.replace(/\s/g, ""))){ // Check if word AND Has no hiragana 
        setStairs(prevStairs => [...prevStairs, currentInput.replace(/\s/g, "")])
        setCurrentInput("")
      }else{
        console.log("nope")
      }
      setCurrentInput("")
    }
  }

  useEffect(() => {
    console.log(currentInput)
    document.getElementById("magic-output").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    document.addEventListener("keydown", handleEnter)
    return () => {
      document.removeEventListener("keydown", handleEnter)
    }
  }, [currentInput])

  const apiTest = () => {
    console.log("testing")
    fetch(apiUrl + "kanji/頭痛/stairsdaily/userName", {method: "POST"})
    .then(res => res.json())
    .then(json => console.log(json))
  }

  return (
    <div className='stairs'>
      <button onClick={apiTest}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</button>
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