import React from 'react';
import cn from 'classnames';
import styles from './profile-nav.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/actions/authActions';
import { Pages } from '../../utils/constants';
import { useDispatch } from '../../services';


interface IProfilelNavProps {
  props?: string;
}


const ProfileNav = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  console.log(pathname);

  const onClick = () => {
    dispatch(logout());
  };

  const handleClick = (page: Pages) => {
    navigate(page);
  };

  const navigate = useNavigate();
  return (
    <div className={cn(styles.profileList)}>
    <ul>
      <li onClick={() => handleClick(Pages.profile)}>
        <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6', pathname === Pages.profile ? styles.active : null)}>Профиль</p>
      </li>
      <li onClick={() => handleClick(Pages.orders)}>
        <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6', pathname === Pages.orders ? styles.active : null)}>История заказов</p>
      </li>
      <li onClick={onClick}>
        <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6')}>Выход</p>
      </li>
    </ul>
    <p className={cn(styles.profileItem, 'text text_type_main-default', 'pt-20')}>В этом разделе вы можете изменить свои персональные данные</p>
  </div>
  );
};


export default ProfileNav;