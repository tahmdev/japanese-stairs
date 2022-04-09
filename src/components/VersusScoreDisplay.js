import { useEffect, useState } from "react"

const VersusScoreDisplay = ({roomInfo}) => {

  let [blueStyle, setBlueStyle] = useState("0%")
  let [redStyle, setRedStyle] = useState("0%")
  useEffect(() => {
    if (roomInfo.settings.mode === "Team (lead)"){
      let unit = 100 / roomInfo.settings.leadToWin
      let difference = roomInfo.red.score - roomInfo.blue.score
      if (difference > 0){
           setRedStyle(`${unit * difference}%`)
      }else if ( difference < 0){
        setBlueStyle(`${unit * (difference * -1)}%`)
      }else{
        setBlueStyle(`0%`)
        setRedStyle(`0%`)
      }
    }
    if (roomInfo.settings.mode === "Team (time)"){
      let total = roomInfo.red.score + roomInfo.blue.score 
      setRedStyle(`${roomInfo.red.score / total * 100}%`)
      setBlueStyle(`${roomInfo.blue.score / total * 100}%`)
    }
  }, [roomInfo.blue.score, roomInfo.red.score])

  return(
    <div className="versus-score-display">
      <div className="red-score" style={{width: redStyle}}/>
      <div className="blue-score" style={{width: blueStyle}}/>
    </div>
  )
}
export default VersusScoreDisplay