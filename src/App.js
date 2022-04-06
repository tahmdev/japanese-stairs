import { useEffect, useState, useCallback } from 'react';
import './App.css';
import MagicInput from './components/magicInput';
import useWebSocket, { ReadyState } from 'react-use-websocket';


// SETTINGS, WEBSOCKET, PVP
// Next steps: 

// MOVE STAIR DISPLAY TO DIFFERENT FILE 
// THIS IS THE DAILY KANJI / STARTING PAGE
// ADD VerifyKanji and VerifyClassic Functions to Stairdisplay.js and pass them as props to verify depending on mode
// Make game reset every 24 hours 
// Multiplayer 
//  1v1 + 2v2, 
//  Time based + lead based

// All of the above with shiritori

let apiUrl = "http://localhost:9000/stairs/"

function App() {
  const [stairs, setStairs] = useState(["ロード中"])
  const [socketUrl, setSocketurl] = useState("ws://localhost:7000/")

  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);
  
  useEffect(() => {
    if (lastMessage) setStairs(prev => [...prev, lastMessage.data]);
  }, [lastMessage]);

  // get initial stairs
  useEffect(() => {
    fetch(apiUrl + "dailyKanji")
    .then(res => res.json())
    .then(json => setStairs([...json]))
  }, [])
  return (
    <div className="App">
      <StairDisplay stairs={stairs} setStairs={setStairs} sendMessage={sendMessage}/>
    </div>
  );
}

export default App;


const StairDisplay = ({stairs, setStairs, sendMessage}) => {
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
          if (stairs.at(-1).at(-1)  === cleanInput.at(0)  // if new starts with last char of old
            && !stairs.includes(cleanInput)               // is not a repeat
            && cleanInput.length >= 2                     // At least 2 characters long
            && cleanInput.length <= 4){                   // not longer than 4 characters
            sendMessage(cleanInput)
            console.log("YEP")
            console.log()
          }else{
            console.log("nope")
          }
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