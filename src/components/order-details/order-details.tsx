import { useState, useEffect } from 'react';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderStatus } from '../../utils/constants';

import styles from './order-details.module.css';


type OrderDetailsProps = {
  isLoading: boolean;
  isError: boolean;
  status: OrderStatus;
  number: number;
};

const OrderDetails = () => {
  const [state, setState] = useState<OrderDetailsProps>({
    isLoading: false,
    isError: false,
    status: OrderStatus.pending,
    number: Math.floor(Math.random() * 1000000)
  });

  // Иммитация обработки заказа
  useEffect(() => {
    const timer = setTimeout(() => {      
      setState({
        ...state,
        status: OrderStatus.inProgress
      });
      const timer2 = setTimeout(() => {
        setState({
          ...state,
          status: OrderStatus.done
        });
        clearTimeout(timer);
        clearTimeout(timer2);
      }, 2000);
    }, 1000);
  }, []);

  return (
    <div className={`${styles.details} mt-4 mb-15`}>
      <p className={`${styles.number} text text_type_digits-large`}>{state.number}</p>
      <p className={`text text_type_main-medium pt-8`}>Идентификатор заказа</p>
      <div className={`${styles.icon} my-15`}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className={`text text_type_main-medium mt-15`}>Ваш заказ {state.status}</p>
      <p className={`text text_type_main-default text_color_inactive mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export { OrderDetails };