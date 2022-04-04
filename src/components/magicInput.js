const MagicInput = ({ text, position, setCurrentInput, inputClass, outputClass}) => {

  return(
    <>
      <textarea 
      type="text" 
      id="magic-input"
      className={`magic-input ${inputClass}`}
      style={position}
      onChange={e => setCurrentInput(e.target.value)}
      value={text}
      autoFocus
      />
      <div 
      id ="magic-output"
      className={`magic-output ${outputClass}`}
      style={position}
      >
      {text}
      </div>
    </>
  )
}
export default MagicInput