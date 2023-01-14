import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import { NavItemProps } from '../../utils/types';

import styles from './app-header.module.css';


const NavItem = (props: NavItemProps) => {
  const active = props.active ? styles.active : '';

  return (
    <li className={`${styles.menuList} px-5 py-4`}>
      {props.children}
      <p className={`${active} text text_type_main-default`}>{props.text}</p>
    </li>
  );
}


const AppHeader = () => {
  return (
    <header className={`${styles.header} py-4`}>
      <nav className={`${styles.nav} container`}>
        <ul className={`${styles.menuList}`}>
          <a href='#'><NavItem text='Конструктор' active={true} ><BurgerIcon type='primary' /></NavItem></a>
          <a href='#'><NavItem text='Лента заказов'><ListIcon type='secondary' /></NavItem></a>
        </ul>
        <a href='#'><Logo /></a>
        <a href='#'><NavItem text='Личный кабинет'><ProfileIcon type='secondary' /></NavItem></a>
      </nav>
    </header>
  );
}


export default AppHeader;
