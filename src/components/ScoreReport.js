import { useEffect } from "react";
import React from "react";
const ScoreReport = ({data, setShowScore}) => {
  let ref = React.useRef();

  useEffect(() => {
    window.addEventListener("mousedown", hidePopup)
    return () => {
      window.removeEventListener("mousedown", hidePopup)
    }
  })
  const hidePopup = (e) => {
    if (!ref.current.contains(e.target)){
      setShowScore(false)
    }
  }
  data.sort((a, b) => a.score + b.score)
  return(
    <div className="popup score-popup" ref={ref}>
      <button onClick={() => setShowScore(false)}> X </button>
      {data.map((player, idx) => {
        return(
          <div key={`${player.id} + ${player.name}`} className="score-wrapper" >
            <span className="score-text">{idx}. {player.name}</span>
            <span className="score-text">{player.score}</span>
          </div>
        )
      })}
    </div>
  )
}
export default ScoreReport