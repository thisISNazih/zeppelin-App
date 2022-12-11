import './styles.scss';
import { Link } from 'react-router-dom';

const ActionButton = ({ text, onClickHandler, link, path, secondary }) => {
  return (
    <div className={secondary ? 'action-btn__secondary' : 'action-btn'}>
      {link ? (
        <Link to={path}>{text}</Link>
      ) : (
        <button onClick={() => onClickHandler()}>{text}</button>
      )}
    </div>
  );
};
export default ActionButton;
