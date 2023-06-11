import cn from 'classnames';

import styles from  './profile.module.scss';

import ProfileNav from '../../components/profile-nav';
import ProfileChange from '../../components/profile-change';
import { useLocation, useParams } from 'react-router-dom';

import OrderCards from '../../components/order-cards';
import { useOrders } from '../../hooks/api';
import { WS_API } from '../../utils/constants';
import Orders from '../orders';


const Profile = () => {
  const { pathname } = useLocation();
  let { id } = useParams();

  useOrders(WS_API.orders, true);
  
  return id ? <Orders /> : (
    <div className={cn(styles.wrapper)}>
      <ProfileNav />
      {pathname === '/profile' && <ProfileChange />}
      {pathname === '/profile/orders' && <OrderCards  extraClass='flex-grow' showStatus={ true }/>}
    </div>
  );
};

export default Profile;