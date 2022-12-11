import ActionButton from '../Button/Button';
import './styles.scss';

const Dropdown = ({ label, options, clickHandler, selectHandler, show }) => {
  return (
    <div className='dropdown'>
      <ActionButton
        text={label}
        onClickHandler={() => clickHandler()}
        class='dropbtn'
        secondary
      />
      <div
        id='myDropdown'
        className={show ? 'dropdown-content show' : 'dropdown-content'}
      >
        {options &&
          options.map((option, i) => {
            return (
              <a key={i} onClick={() => selectHandler(option)}>
                {option}
              </a>
            );
          })}
      </div>
    </div>
  );
};
export default Dropdown;
