import React from 'react';
import cn from 'classnames';
import styles from './order-cards.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services';


interface IOrderCardsProps {
  extraClass?: string;
  showStatus?: boolean;
}

interface IOrderCardProps {
  id?: string;
  showStatus?: boolean;
}


export const OrderCards: React.FC<IOrderCardsProps> = ({ extraClass, showStatus }) => {
  const { orders } = useSelector((store: RootState) => store.feed);

  return (
    <div className={cn(styles.section, styles.scrollableSection, styles[`${extraClass}`], 'section', 'custom-scroll')}>
      {orders.map((order) => (
        <OrderCard key={order._id} showStatus={showStatus} id={order._id} />
      ))}
    </div>
  );
};


export const OrderCard: React.FC<IOrderCardProps> = ({ showStatus, id }) => {  
  const location = useLocation()

  if (!id) {
    id = location.state.id;
  } 

  const { orders } = useSelector((store: RootState) => store.feed);
  const { ingredientsRaw } = useSelector((store: RootState) => store.ingredients);
  const order = orders.find(order => order._id === id);
  const orderIngredients = order?.ingredients.map(id => ingredientsRaw?.find(ingredient => ingredient._id === id));
  const price = orderIngredients?.reduce((acc, curr) => acc + (curr?.price ?? 0), 0);
  const { _id, number, createdAt, name, status, ingredients } = order ?? {};
  const arrLength = ingredients?.length ?? 0;
  const maxImgCount = 6;

  return (
    <Link 
      to={{ pathname: `${location.pathname}/${_id}` }}
      state={{ background: location, id: _id }}
    >
      <div className={cn(styles.OrderCard, 'p-6')} >
        <div className={cn('flex-wrapper space-between')}>
          <p className={cn(styles.number, 'text text_type_digits-default')}>#{ number }</p>
          <p className={cn(styles.date, 'text text_type_main-small text_color_inactive')}>{createdAt && new Date(createdAt).toLocaleString()}</p>
        </div>
        <h2 className={cn(styles.header, 'text text_type_main-medium pt-6')}>
          {name}
        </h2>
        {showStatus && (
          <p className={cn(styles.status, 'text text_type_main-default text_color_inactive pt-2')}>
            {status}
          </p>
        )}
        <div className={cn(styles.iconsWrapper, 'flex-wrapper', 'pt-6')}>
          {orderIngredients && orderIngredients.map((ingredient, i) => {
            if (i + 1 > maxImgCount) return null;
            if (!ingredient || typeof ingredient === 'string' ) return null;
            
            const { image, image_mobile, image_large, name } = ingredient;
            const srcSet = `${image_mobile} 480w, ${image} 768w, ${image_large} 1280w`;

            return (
              <div key={i} className={cn(styles.border)}>
                <picture className={styles.picture}>
                  <source srcSet={srcSet} />
                  <img src={image} alt={name} className={cn(styles.overflow)}/>
                </picture>
                {arrLength > maxImgCount && !i && (
                  <div className={cn(styles.overflow, styles.overflowWrapper)}>
                    <p className={cn(styles.overflowText, 'text text_type_main-default')}>
                      +{arrLength - maxImgCount}
                    </p>
                  </div>
                )}
              </div>
            );
          })} 
          <div className={cn(styles.priceWrapper, 'flex-wrapper')}>
            <p className={`text text_type_digits-default pr-2`}>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};



export default OrderCards;