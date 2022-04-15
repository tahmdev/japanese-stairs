import { useEffect } from "react"

const SelectInput = ({setState, state, options, name, label}) => {
  return(
    <div className='form-flex'>
      <label htmlFor={name}>{label} </label>
      <select id={name} name={name} onChange={e => setState(e.target.value)} value={state}>
        {options.map(item => {
          return(
            <option key={item}> {item} </option>
          )
        })}
      </select>
    </div>
  )
}
const TextInput = ({state, setState, placeholder, name, label, maxLength=16}) => {
  return(
    <div className='form-flex'>
      <label htmlFor={name}> {label} </label>
      <input id={name} type="text" placeholder={placeholder} name={name} onChange={e => e.target.value.length <= maxLength ? setState(e.target.value) : setState(state)} value={state}/>
    </div>
  )
}
const NumberInput = ({state, setState, name, label, maxValue}) => {
  return(
    <div className='form-flex'>
      <label htmlFor={name}>{label} </label>
      <input id={name} type="number" placeholder='' name={name} onChange={e => e.target.value > -1 && e.target.value <= maxValue ? setState(e.target.value) : null} value={state}/>
    </div>
  )
}
const CheckInput = ({state, setState, name, label}) => {


  return(
    <div className='form-flex check-input'>
      <label htmlFor={name}>{label} </label>
      <input id={name} type="checkbox" onChange={e => setState(e.target.checked)} checked={state} />
    </div>
  )
}
let settings = {SelectInput, NumberInput, TextInput, CheckInput}
export default settings