const ModeSelect = ({setMode, mode}) => {
  return(
    <div className='form-flex'>
      <label htmlFor="mode-input">Mode: </label>
      <select id="mode-input" name="mode" onChange={e => setMode(e.target.value)} value={{mode}}>
        <option>しりとり</option>
        <option>漢字とり</option>
        <option>Temp</option>
      </select>
    </div>
  )
}

const TextInput = ({state, setState, placeholder, name, label}) => {
  return(
    <div className='form-flex'>
      <label htmlFor={name}> {label} </label>
      <input id={name} type="text" placeholder={placeholder} name={name} onChange={e => setState(e.target.value)} value={state}/>
    </div>
  )
}

const NumberInput = ({state, setState, name, label}) => {
  return(
    <div className='form-flex'>
      <label htmlFor={name}>{label} </label>
      <input id={name} type="number" placeholder='' name={name} onChange={e => setState(e.target.value)} value={state}/>
    </div>
  )
}

let settings = {ModeSelect, NumberInput, TextInput}
export default settings



//Modes:

//Classic turn based with optional timer 
//Turn length
//Turn length reduce per turn

//Team vs Team
//Lead => Lead to win
//Time => Round time, 