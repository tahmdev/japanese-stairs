import { useEffect, useState, useCallback } from 'react';
import StairDisplay from "../components/StairDisplay";

let apiUrl = "http://localhost:9000/stairs/"

function Home({ socket }) {
  const [stairs, setStairs] = useState(["ロード中"])

  useEffect(() => {
    socket.on("newMessage", data => {
      setStairs(data);
      console.log("new message")
    })
  }, []);

  // get initial stairs
  useEffect(() => {
    fetch(apiUrl + "dailyKanji")
    .then(res => res.json())
    .then(json => setStairs([...json]))
  }, [])
  
  return (
    <div className="Home">
      <button onClick={ () => socket.emit("kanji", "体躯")}>EMIT EHRE</button>
      <StairDisplay stairs={stairs} setStairs={setStairs} socket={socket}/>
    </div>
  );
}

export default Home;