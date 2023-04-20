import React from 'react';
import cn from 'classnames';
import styles from './order-cards.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Pages } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


interface IOrderCardsProps {
  extraClass?: string;
  showStatus?: boolean;
}


export const OrderCards: React.FC<IOrderCardsProps> = ({ extraClass, showStatus }) => {
  return (
    <div className={cn(styles.section, styles.scrollableSection, styles[`${extraClass}`], 'section', 'custom-scroll')}>
      {Array(10).fill(0).map((_, i) => (
        <OrderCard key={i} showStatus={showStatus} />
      ))}
    </div>
  );
};


interface IOrderCardProps {
  showStatus?: boolean;
}
// srcSet: string;
// src: string;
// alt?: string;
// overflow?: number;
// extraClass?: string;
// srcSet, src, alt='ingredient', overflow=0, extraClass

const OrderCard: React.FC<IOrderCardProps> = ({ showStatus }) => {
  const navigate = useNavigate();
  const maxImgCount = 6;
  const srcSet = 'https://code.s3.yandex.net/react/code/sauce-04.png';
  const src = 'https://code.s3.yandex.net/react/code/sauce-04.png';
  const alt = 'ingredient';
  const arrLength = 12;
  const status = 'Выполнен';


  const handleClick = (page: Pages, id: string) => {
    navigate(`${page}/${id}`);
  };

  return (
    <div className={cn(styles.OrderCard, 'p-6')} onClick={() => handleClick(Pages.orders, 'ab1')}>
      <div className={cn('flex-wrapper space-between')}>
        <p className={cn(styles.number, 'text text_type_digits-default')}>#12312312</p>
        <p className={cn(styles.date, 'text text_type_main-small text_color_inactive')}>#12312312</p>
      </div>
      <h2 className={cn(styles.header, 'text text_type_main-medium pt-6')}>
        Interstellar burger
      </h2>
      {showStatus && (
        <p className={cn(styles.status, 'text text_type_main-default text_color_inactive pt-2')}>
          {status}
        </p>
      )}
      <div className={cn(styles.iconsWrapper, 'flex-wrapper', 'pt-6')}>
        {Array(arrLength).fill(0).map((_, i) => {
          if (i + 1 > maxImgCount) return null;

          return (
            <div key={i} className={cn(styles.border)}>
              <picture className={styles.picture}>
                <source srcSet={srcSet} />
                <img src={src} alt={alt} className={cn(styles.overflow)}/>
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
          <p className={`text text_type_digits-default pr-2`}>1234</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};



export default OrderCards;