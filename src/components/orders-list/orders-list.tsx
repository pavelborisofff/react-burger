import React from 'react';
import cn from 'classnames';
import styles from './orders-list.module.scss';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/actions/authActions';
import { Pages } from '../../utils/constants';


interface IOrdersListProps {
  props?: string;
}


const OrdersList = () => {
  return (
    <>
      kijkulist
    </>
  );
};


export default OrdersList;