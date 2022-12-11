import './styles.scss';

const InputField = ({ onChangeHandler, inputValue, label }) => {
  return (
    <div className='custom-inputField'>
      <label>{label}</label>
      <input onChange={(e) => onChangeHandler(e)} value={inputValue} />
    </div>
  );
};
export default InputField;
