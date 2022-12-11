import './styles.scss';
import ActionButton from '../../reusableComponents/Button/Button';

const LandingPage = () => {
  return (
    <div className='landingPage-wrapper'>
      <img src='zeppelin-logo.svg' />
      <div className='buttons-placeholder'>
        <ActionButton
          text={'Dispatcher'}
          path={'/dispatchers-dashboard'}
          link
        />
        <ActionButton text={'Service Staff'} path={'/staff-dashboard'} link />
      </div>
    </div>
  );
};

export default LandingPage;
