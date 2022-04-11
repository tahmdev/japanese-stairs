import { useEffect } from "react";
import React from "react";
import Popup from "./popup";
const ScoreReport = ({data, setShowScore, roomInfo}) => {
  
  data.sort((a, b) => b.score - a.score)
  return(
    <Popup classes={"popup score-popup"} setShow={setShowScore}>
        <button onClick={() => setShowScore(false)}> X </button>
        {roomInfo.settings.mode === "Classic" && data.map((player, idx) => {
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
          : roomInfo.blue.score === roomInfo.red.score 
          ? <span className="draw-score-report"> Draw! </span>
          : null
        }
    </Popup>
  )
}
export default ScoreReport