import './styles.scss';

const FilterTag = ({ tagname, removeHandler }) => {
  return (
    <span className='filterTag'>
      {tagname} <span onClick={() => removeHandler()}>x</span>
    </span>
  );
};
export default FilterTag;
