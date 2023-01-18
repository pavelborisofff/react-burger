import { useContext } from 'react';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderStatus } from '../../utils/constants';

import styles from './order-details.module.css';
import { OrderContext } from '../../contexts/constructor-context';


const OrderDetails = () => {
  const { number } = useContext(OrderContext);

  return (
    <div className={`${styles.details} mt-4 mb-15`}>
      <p className={`${styles.number} text text_type_digits-large`}>{number || '---'}</p>
      <p className={`text text_type_main-medium pt-8`}>Идентификатор заказа</p>
      <div className={`${styles.icon} my-15`}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className={`text text_type_main-medium mt-15`}>Ваш заказ {number ? OrderStatus.inProgress : OrderStatus.pending}</p>
      <p className={`text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export { OrderDetails };