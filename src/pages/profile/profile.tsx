import cn from 'classnames';

import styles from  './profile.module.scss';

import ProfileNav from '../../components/profile-nav';
import ProfileChange from '../../components/profile-change';
import { useLocation } from 'react-router-dom';
import OrdersList from '../../components/orders-list';
import OrderCards from '../../components/order-cards';


const Profile = () => {
  const { pathname } = useLocation();

  
  return (
    <div className={cn(styles.wrapper)}>
      <ProfileNav />
      {pathname === '/profile' && <ProfileChange />}
      {pathname === '/profile/orders' && <OrderCards  extraClass='flex-grow' showStatus={ true }/>}
    </div>
  );
};

export default Profile;