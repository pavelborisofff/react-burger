import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './stats.module.scss';
import { RootState, useSelector } from '../../services';
import { TOrderType } from '../../services/middleware/wsMiddleware';


interface IStatsProps {
  props?: string;
}

export const Stats: React.FC<IStatsProps> = ({ props }) => {
  const { orders, total, totalToday } = useSelector((store: RootState) => store.feed);
  const ordersDone = orders.filter((order) => order.status === 'done').slice(0, 20);
  const ordersPending = orders.filter((order) => order.status === 'pending').slice(0, 20);
  
  return (
    <div className={cn(styles.section, 'section')}>
      <ReadyOrders ordersDone={ordersDone}/>
      <PreparingOrders ordersPending={ordersPending}/>
      <TotalOrders total={total}/>
      <TodayOrders totalToday={totalToday} />
    </div>
  );
};

const ReadyOrders: React.FC<{ ordersDone: TOrderType[]}> = ({ordersDone}) => {
  return (
    <div className={cn(styles.ready)}>
      <p className={cn(styles.title, 'text text_type_main-medium pb-6')}>
        Готовы:
      </p>
      <ul className={cn(styles.list)}>
        { ordersDone && ordersDone.map((order) => (
          <li className={cn(styles.number, 'text text_type_digits-default')} key={order.number}>#{order.number}</li>
        ))}
      </ul>
    </div>
  );
};

const PreparingOrders: React.FC<{ ordersPending: TOrderType[] }> = ({ ordersPending }) => {
  return (
    <div className={cn(styles.preparing)}>
      <p className={cn(styles.title, 'text text_type_main-medium  pb-6')}>
        В работе:
      </p>
      <ul className={cn(styles.list)}>
        { ordersPending && ordersPending.map((order) => (
          <li className={cn(styles.number, 'text text_type_digits-default')} key={order.number}>#{order.number}</li>
        ))}
      </ul>
    </div>
  );
};

const TotalOrders: React.FC<{total: number}> = ({total})  => {
  return (
    <div className={cn(styles.total)}>
      <p className={cn(styles.title, 'text text_type_main-medium')}>
        Выполнено за все время:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-large')}>{total}</p>
    </div>
  );
};

const TodayOrders: React.FC<{totalToday: number}> = ({totalToday}) => {

  return (
    <div className={cn(styles.today)}>
      <p className={cn(styles.title, 'text text_type_main-medium')}>
        Выполнено за сегодня:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-large')}>{totalToday}</p>
    </div>
  );
};

export default Stats;