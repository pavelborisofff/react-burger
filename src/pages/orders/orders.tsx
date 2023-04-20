import React from 'react';
import cn from 'classnames';
import styles from './orders.module.scss';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


interface IOrdersProps {
  props?: string;
}

export const Orders: React.FC<IOrdersProps> = ({ props }) => {
  let { id } = useParams();
  const srcSet = 'https://code.s3.yandex.net/react/code/sauce-04.png';
  const src = 'https://code.s3.yandex.net/react/code/sauce-04.png';
  const alt = 'ingredient';
  const arrLength = 12;
  const price = 123;
  const multiplier = 2;
  const totalPrice = 1234;
  const status = 'Выполнен';


  return (
    <div className={cn(styles.section)}>
      {/* ID */}
      <p className={cn(styles.number, 'text text_type_digits-default')}>#{id}</p>
      {/* NAME */}
      <h2 className={cn(styles.header, 'text text_type_main-medium pt-10')}>
        Interstellar burger
      </h2>
      {/* STATUS */}
      <p className={cn(styles.status, 'text text_type_main-default text_color_inactive pt-2')}>
        {status}
      </p>
      <p className={cn('text text_type_main-medium pt-15')}>Состав:</p>
      <div className={cn(styles.scrollableSection, 'section', 'custom-scroll')}>
        {/* INGREDIENTS LIST */}
        {Array(10).fill(0).map((_, i) => (
          <div className={cn(styles.ingredient, 'flex-wrapper pr-6 pt-4')}>
            {/* IMG */}
            <div key={i} className={cn(styles.border)}>
              <picture className={styles.picture}>
                <source srcSet={srcSet} />
                <img src={src} alt={alt} className={cn(styles.overflow)} />
              </picture>
            </div>
            {/* NAME */}
            <p className={cn(styles.overflowText, 'text text_type_main-default pl-4')}>
              Филе Люминесцентного тетраодонтимформа
            </p>
            {/* PRICE */}
            <div className={cn(styles.priceWrapper, 'flex-wrapper')}>
              <p className={`text text_type_digits-default pr-2`}>{multiplier}x{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      {/* FOOTER */}
      <div className={cn('flex-wrapper space-between pt-10')}>
        <p className={cn(styles.date, 'text text_type_main-small text_color_inactive')}>#12312312</p>
        <div className={cn(styles.priceWrapper, 'flex-wrapper')}>
          <p className={`text text_type_digits-default pr-2`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Orders;