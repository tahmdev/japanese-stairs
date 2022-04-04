const MagicInput = ({ text, position, handleChange, inputClass, outputClass}) => {

  return(
    <>
      <textarea 
      type="text" 
      id="input"
      className={`magic-input ${inputClass}`}
      style={position}
      onChange={e => handleChange(e.target.value)}
      autoFocus
      />
      <div 
      className={`magic-output ${outputClass}`}
      style={position}
      >
      {text}
      </div>
    </>
  )
}
export default MagicInput