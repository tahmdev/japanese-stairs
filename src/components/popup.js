import { useEffect } from "react";
import React from "react";

const Popup = ({setShow, children, classes}) => {
  let ref = React.createRef();

  useEffect(() => {
    window.addEventListener("mousedown", hidePopup)
    return () => {
      window.removeEventListener("mousedown", hidePopup)
    }
  })
  const hidePopup = (e) => {
    if (!ref.current.contains(e.target)){
      setShow(false)
    }
  }

  return(
    <div className="popup-bg">
      <div className={classes} ref={ref}>
        {children}
      </div>
    </div>
  )
}
export default Popup