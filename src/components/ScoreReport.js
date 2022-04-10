import { useEffect } from "react";
import React from "react";
const ScoreReport = ({data, setShowScore, roomInfo}) => {
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
  data.sort((a, b) => b.score - a.score)
  return(
    <div className="popup score-popup" ref={ref}>
      <button onClick={() => setShowScore(false)}> X </button>
      {roomInfo.settings.mode === "しりとり" || roomInfo.settings.mode === "漢字取" && data.map((player, idx) => {
        return(
          <div key={`${player.id} + ${player.name}`} className="score-wrapper" >
            <span className="score-text">{idx + 1}. {player.name}</span>
            <span className="score-text">{player.score}</span>
          </div>
        )
      })}
      {roomInfo.settings.mode === "Team (lead)" &&
        roomInfo.red.score > roomInfo.blue.score 
        ? <span className="red-score-report"> Red wins! </span>
        : roomInfo.blue.score > roomInfo.red.score 
        ? <span className="blue-score-report"> Blue wins! </span>
        : <span className="draw-score-report"> Draw! </span>
      }
    </div>
  )
}
export default ScoreReport