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

let settings = {SelectInput, NumberInput, TextInput}
export default settings