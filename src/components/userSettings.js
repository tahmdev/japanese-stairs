import settings from './settingComponents.js';
import Popup from './popup.js';
import { useState } from 'react';
const UserSettings = ({userSettings, setUserSettings, setShow}) => {
  let [currentName, setCurrentName] = useState(userSettings.name)
  let [currentColor, setCurrentColor] = useState(userSettings.color)
  let [currentBackground, setCurrentBackground] = useState(userSettings.background)

  const saveSettings = (e) => {
    e.preventDefault()
    setUserSettings({
      name: currentName,
      color: currentColor,
      background: currentBackground,
    })
    setShow(false)
  }

  let {TextInput} = settings
  return(
    <Popup classes="popup" setShow={setShow}>
      <form className='flex-container-column'>
        <TextInput state={currentName} setState={setCurrentName} name="user-name-input" label="Username: " />
        <TextInput state={currentColor} setState={setCurrentColor} name="color-input" label="Color: " />
        <TextInput state={currentBackground} setState={setCurrentBackground} name="background-input" label="Background: " />
        <div>
          <button onClick={() => setShow(false)}> Discard </button>
          <button onClick={saveSettings} > Save </button>
        </div>
      </form>
    </Popup>
  )
}
export default UserSettings