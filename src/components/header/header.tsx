import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './header.module.scss';

import { Pages } from '../../utils/constants';
import cn from 'classnames';


export type NavItemProps = {
  text: string;
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};


const NavItem = (props: NavItemProps) => {
  const active = props.active ? styles.active : '';

  return (
    <li className={cn(styles.menuItem, 'px-5, py-4', props.className)} onClick={props.onClick}>
        {props.children}
        <p className={`${active} text text_type_main-default`}>{props.text}</p>
    </li>
  );
};

const AppHeader = () => {
  const navigate = useNavigate();

  const handleClick = (page: Pages) => {
    navigate(page);
  };

  return (
    <header className={`${styles.header} py-4`}>
      <nav className={`${styles.nav} container`}>
        <ul className={`${styles.menuList}`}>
          <NavItem text='Конструктор' onClick={() => handleClick(Pages.main)} active={true}>
              <BurgerIcon type='primary' />
          </NavItem>
          <NavItem text='Лента заказов' onClick={() => handleClick(Pages.order)}>
            <ListIcon type='secondary' />
          </NavItem>
          <NavItem text='Личный кабинет' onClick={() => handleClick(Pages.profile)} className={cn(styles.profile)}>
            <ProfileIcon type='secondary' />
          </NavItem>
        </ul>
        <Link to={Pages.main} className={styles.logo}>
          <Logo />
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
