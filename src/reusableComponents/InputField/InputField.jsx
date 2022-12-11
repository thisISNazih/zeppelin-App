import './styles.scss';

const InputField = ({ onChangeHandler, inputValue, label, invalidInput, width }) => {
  return (
    <div className='custom-inputField'>
      <label>{label}</label>
      <input onChange={(e) => onChangeHandler(e)} value={inputValue} style={{width: width}}/> 
      {invalidInput && <span className='inavlid-input'>The entered serial number is incorrect.</span>}
    </div>
  );
};
export default InputField;
