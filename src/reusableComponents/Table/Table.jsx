import './styles.scss';
import { formatTableHeader } from '../../utils/table';
import { useSortable } from '../../customHooks/useSortable';

const Table = ({ data, keys, sortable }) => {
  const usedData = data;
  const { items, requestSort, sortConfig } = useSortable(usedData);
  const tableData = sortable ? items : data;
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table>
      <thead>
        <tr>
          {keys &&
            keys.map((entry, i) => {
              return sortable ? (
                <th
                  key={i}
                  type='button'
                  onClick={() => requestSort(entry)}
                  className={getClassNamesFor(entry)}
                >
                  <a href='#' className='sort-by'>
                    {formatTableHeader(entry)}
                  </a>
                </th>
              ) : (
                <th key={i} type='button'>
                  <a href='#'>{formatTableHeader(entry)}</a>
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((entry, i) => {
          return (
            <tr key={i}>
              {keys.map((header, i) => {
                let textToDisplay = entry[header];
                let styleClass = '';
                if (entry[header] === true) {
                  textToDisplay = 'Valid';
                  styleClass = 'valid';
                }
                if (entry[header] === false) {
                  textToDisplay = 'Expired';
                  styleClass = 'expired';
                }
                return (
                  <td key={i}>
                    {' '}
                    <span className='hidden-header'>
                      {formatTableHeader(header)}
                    </span>
                    <span className={styleClass}>{textToDisplay}</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
