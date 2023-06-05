import React from 'react';
import cn from 'classnames';
import styles from './orders.module.scss';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { RootState, useSelector } from '../../services';


interface IOrdersProps {
  props?: string;
}

export const Orders: React.FC<IOrdersProps> = ({ props }) => {
  let { id } = useParams();
  const { orders } = useSelector((store: RootState) => store.feed);
  const { ingredientsRaw } = useSelector((store: RootState) => store.ingredients);
  const order = orders.find(order => order._id === id);
  const orderIngredients = order?.ingredients.map(id => ingredientsRaw?.find(ingredient => ingredient._id === id));
  const price = orderIngredients?.reduce((acc, curr) => acc + (curr?.price ?? 0), 0);
  const { number, createdAt, name, status } = order ?? {};

  return (
    <div className={cn(styles.section)}>
      {/* ID */}
      <p className={cn(styles.number, 'text text_type_digits-default')}>#{number}</p>
      {/* NAME */}
      <h2 className={cn(styles.header, 'text text_type_main-medium pt-10')}>
        {name}
      </h2>
      {/* STATUS */}
      <p className={cn(styles.status, 'text text_type_main-default text_color_inactive pt-2')}>
        {status}
      </p>
      <p className={cn('text text_type_main-medium pt-15')}>Состав:</p>
      <div className={cn(styles.scrollableSection, 'section', 'custom-scroll')}>
        {/* INGREDIENTS LIST */}
        {orderIngredients && orderIngredients.map((ingredient, i) => {
          const { image, image_mobile, image_large, name, price } = ingredient ?? {};
          const srcSet = `${image_mobile} 480w, ${image} 768w, ${image_large} 1280w`;
          
          return (
            <div key={i} className={cn(styles.ingredient, 'flex-wrapper pr-6 pt-4')}>
              {/* IMG */}
              <div key={i} className={cn(styles.border)}>
                <picture className={styles.picture}>
                  <source srcSet={srcSet} />
                  <img src={image} alt={name} className={cn(styles.overflow)} />
                </picture>
              </div>
              {/* NAME */}
              <p className={cn(styles.overflowText, 'text text_type_main-default pl-4')}>
                { name }
              </p>
              {/* PRICE */}
              <div className={cn(styles.priceWrapper, 'flex-wrapper')}>
                <p className={`text text_type_digits-default pr-2`}>{price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          )
        })}
      </div>
      {/* FOOTER */}
      <div className={cn('flex-wrapper space-between pt-10')}>
        <p className={cn(styles.date, 'text text_type_main-small text_color_inactive')}>{createdAt && new Date(createdAt).toLocaleString()}</p>
        <div className={cn(styles.priceWrapper, 'flex-wrapper')}>
          <p className={`text text_type_digits-default pr-2`}>{ price }</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Orders;