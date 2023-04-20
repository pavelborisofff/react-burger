import React from 'react';
import cn from 'classnames';
import styles from './stats.module.scss';


interface IStatsProps {
  props?: string;
}

export const Stats: React.FC<IStatsProps> = ({ props }) => {
  return (
    <div className={cn(styles.section, 'section')}>
      <ReadyOrders />
      <PreparingOrders />
      <TotalOrders />
      <TodayOrders />
    </div>
  );
};

const ReadyOrders: React.FC = () => {
  return (
    <div className={cn(styles.ready)}>
      <p className={cn(styles.title, 'text text_type_main-medium pb-6')}>
        Готовы:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
    </div>
  );
};

const PreparingOrders: React.FC = () => {
  return (
    <div className={cn(styles.preparing)}>
      <p className={cn(styles.title, 'text text_type_main-medium  pb-6')}>
        В работе:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
      <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
    </div>
  );
};

const TotalOrders: React.FC = () => {
  return (
    <div className={cn(styles.total)}>
      <p className={cn(styles.title, 'text text_type_main-medium')}>
        Выполнено за все время:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-large')}>24999</p>
    </div>
  );
};

const TodayOrders: React.FC = () => {
  return (
    <div className={cn(styles.today)}>
      <p className={cn(styles.title, 'text text_type_main-medium')}>
        Выполнено за сегодня:
      </p>
      <p className={cn(styles.number, 'text text_type_digits-large')}>123</p>
    </div>
  );
};

export default Stats;