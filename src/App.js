import { useEffect, useState } from 'react';
import './App.css';
import MagicInput from './components/magicInput';

function App() {
  const [stairs, setStairs] = useState(["育児","児童文学","学園","園庭", "存在無物" ])

  return (
    <div className="App">
      <StairDisplay stairs={stairs} setStairs={setStairs}/>
    </div>
  );
}

export default App;


const StairDisplay = ({stairs, setStairs}) => {
  const [length, setLength] = useState([])
  const [height, setHeight] = useState([])
  const [currentInput, setCurrentInput] = useState()

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
    if (e.key === "Enter") console.log("enter")    
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEnter)
    return () => {
      document.removeEventListener("keydown", handleEnter)
    }
  }, [])

  return (
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
      <MagicInput inputClass="horizontal-input" handleChange={setCurrentInput} text={currentInput} position={{left: `${height.at(-1) + 1}rem`, top: `${height.at(-1)}rem`}} />}
      {stairs.length % 2 !== 0 &&  <MagicInput   outputClass="vertical-output"  inputClass="vertical-input" handleChange={setCurrentInput} text={currentInput} position={{left: `${length.at(-1)}rem`, top: `${height.at(-1) + 1}rem`}} />}
      <div className='info' style={{left: `${length.at(-1) }rem`, top: `${height.at(-1) + 1 }rem`}}> Enter a word that starts with {stairs.at(-1).slice(-1)} </div>
      
      
    </div>
  )
}

