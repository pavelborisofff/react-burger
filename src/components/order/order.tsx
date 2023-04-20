import React from 'react';
import cn from 'classnames';
import styles from './stats.module.scss';


interface IOrderProps {
  props?: string;
}

export const Order: React.FC<IOrderProps> = ({ props }) => {
  return (
    <div className={cn(styles.section, 'section')}>
    </div>
  );
};


export default Order;