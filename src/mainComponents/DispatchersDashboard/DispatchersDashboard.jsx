import { useState, useEffect } from 'react';
import Table from '../../reusableComponents/Table/Table';
import { Link } from 'react-router-dom';
import Dropdown from '../../reusableComponents/Dropdown/Dropdown';
import FilterTag from '../../reusableComponents/FilterTag/FilterTag';
import './styles.scss';

const DispatchersDashboard = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [showFilters, setShowFilter] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const headerExclusions = ['guid', 'id'];

  const keys =
    data[0] &&
    Object.keys(data[0]).filter((el) => {
      return headerExclusions.indexOf(el) < 0;
    });

  const getUniqueCutomerNames = () => {
    return data
      .map((item) => item['customer'])
      .filter((v, i, a) => a.indexOf(v) === i);
  };

  const getExpiredWarantyCount = (customerName, contractType) => {
    const customerEntries = selectedFilter
      ? updatedData.filter((item) => item['customer'] === customerName)
      : data.filter((item) => item['customer'] === customerName);
    const expiredWaranryCount = customerEntries.filter(
      (item) => !item[contractType]
    ).length;
    return expiredWaranryCount;
  };

  const getTotalCountForExpiredContracts = (contractType) => {
    const customerNames = selectedFilter
      ? selectedFilter
      : getUniqueCutomerNames();
    let totalCount = 0;
    typeof customerNames === 'string'
      ? (totalCount = getExpiredWarantyCount(customerNames, contractType))
      : customerNames.map((entry) => {
          totalCount += getExpiredWarantyCount(entry, contractType);
        });
    return totalCount;
  };

  const selectFiltersHandler = (selected) => {
    setSelectedFilter(selected);
    setShowFilter(false);
    applyFilterHandler(selected);
  };

  const applyFilterHandler = (selected) => {
    const filteredData = data.filter((item) => item['customer'] === selected);
    setUpdatedData(filteredData);
  };

  const removeFilterHandler = () => {
    setSelectedFilter('');
    setUpdatedData(data);
  };

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [selectedFilter]);

  return (
    <div className='dispatchers-dashboard-wrapper'>
      <div className='header-wrapper'>
        <img src='zeppelin-logo.svg' />
        <div className='back-btn'>
          <Link to={'/'}>Back</Link>
        </div>
        <div className='filter-sorting-wrapper'>
          <Dropdown
            label={'Filter by Customer Name'}
            options={getUniqueCutomerNames()}
            show={showFilters}
            selectHandler={selectFiltersHandler}
            clickHandler={() => setShowFilter(!showFilters && !showSorting)}
          />
          {selectedFilter && (
            <FilterTag
              tagname={selectedFilter}
              removeHandler={removeFilterHandler}
            />
          )}
        </div>
      </div>
      <div className='counts-wrapper'>
        <span>
          Expired Warranties {selectedFilter && `for ${selectedFilter}`}:{' '}
          <span>{getTotalCountForExpiredContracts('warranty')}</span>
        </span>
        <span>
          Expired Service Contracts {selectedFilter && `for ${selectedFilter}`}:{' '}
          <span>{getTotalCountForExpiredContracts('service_contract')}</span>
        </span>
      </div>
      <div className='listing-content'>
        <Table
          data={updatedData && updatedData.length > 0 ? updatedData : data}
          keys={keys}
          sortable
        />
      </div>
    </div>
  );
};
export default DispatchersDashboard;
