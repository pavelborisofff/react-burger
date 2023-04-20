import React from 'react';
import cn from 'classnames';
import styles from './orders.module.scss';
import { useParams } from 'react-router-dom';


interface IOrdersProps {
  props?: string;
}

export const Orders: React.FC<IOrdersProps> = ({ props }) => {
  let { id } = useParams();
  const status = 'Выполнен';


  return (
    <div className={cn(styles.section)}>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#{id}</p>
      <h2 className={cn(styles.header, 'text text_type_main-medium pt-6')}>
        Interstellar burger
      </h2>
      <p className={cn(styles.status, 'text text_type_main-default text_color_inactive pt-2')}>
        {status}
      </p>
      <p className={cn(styles.header, 'text text_type_main-medium pt-6')}>Состав:</p>
      <div className={cn(styles.section, styles.scrollableSection, 'section', 'custom-scroll')}>
        {Array(10).fill(0).map((_, i) => (
          <>
            asdasdasd
          </>
        ))}
      </div>
    </div>
  );
};

export default Orders;