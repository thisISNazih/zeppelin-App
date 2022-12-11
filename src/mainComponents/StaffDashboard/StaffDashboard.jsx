import { useState, useEffect } from 'react';
import Table from '../../reusableComponents/Table/Table';
import ActionButton from '../../reusableComponents/Button/Button';
import InputField from '../../reusableComponents/InputField/InputField';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './styles.scss';

const StaffDashboard = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showInputfield, setShowInpuField] = useState(true);
  const [serialNumberData, setSerialNumberData] = useState([]);
  const [showQrCode, setShowQrCode] = useState(false);
  const headerExclusions = ['guid', 'id'];
  const keys =
    data[0] &&
    Object.keys(data[0]).filter((el) => {
      return headerExclusions.indexOf(el) < 0;
    });

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);
  const onEnterHandler = () => {
    setShowQrCode(true);
  };
  const onSearchHandler = () => {
    const customerObj = data.filter((c) => c.serial_number === inputValue);
    setSerialNumberData(customerObj);
    setInputValue('');
    setShowInpuField(false);
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value.trim());
  };
  const onResetHandler = () => {
    setShowQrCode(false);
    setInputValue('');
    setSerialNumberData([]);
    setShowInpuField(true);
  };


  return (
    <div className='staff-dashboard-wrapper'>
      <div className='back-btn'>
        <Link to={'/'}>Back</Link>
      </div>
      {showInputfield && (
        <>
          {' '}
          <InputField
            onChangeHandler={onChangeHandler}
            inputValue={inputValue}
            label={'Enter Serial Number'}
          />{' '}
          <ActionButton text={'Enter'} onClickHandler={onEnterHandler} />{' '}
        </>
      )}

      {showQrCode && (
        <div
          className='qrcode-placeholder'
          style={{ height: 'auto', width: '100%' }}
        >
          <label>Scan to search for serial number</label>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={inputValue}
            viewBox={`0 0 256 256`}
          />
          <label>or search on our internal system </label>
        </div>
      )}
      {showQrCode && (
        <ActionButton text={'Search'} onClickHandler={onSearchHandler} />
      )}
      {serialNumberData.length > 0 && (
        <>
          <Table data={serialNumberData} keys={keys} />

          <ActionButton
            text={'Enter new serial number'}
            onClickHandler={onResetHandler}
            secondary
          />
        </>
      )}
    </div>
  );
};
export default StaffDashboard;
