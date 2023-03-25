import React from 'react';
import cn from 'classnames';
import styles from './order.module.scss';


interface IOrderProps {
    props?: string;
}

export const Order: React.FC<IOrderProps> = ({ props }) => {
    return (
        <div className={cn(styles.Order)}>
            Order
        </div>
    );
};

export default Order;