import { useState } from 'react';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Data } from '../../utils/types';
import { useModalControl } from '../../hooks/modal-control';
import { Modal } from '../modal/modal';

import styles from './burger-constructor.module.css';


function BurgerConstructor(props:Data[]) {
  const [total, setTotal] = useState<number>(),
        { showModal, handleToggle } = useModalControl();

  return (
    <>
      <Modal showModal={showModal} onClose={handleToggle} heading=''></Modal>
      <section className={`${styles.section} section`}>
        {/* top */}
        <ConstructorElement
          type='top'
          text={props[0].name}
          price={props[0].price}
          thumbnail={props[0].image}
          isLocked={true}
          extraClass={`${styles.constructorElement} ml-8`}
        />
        {/* middle section with scrollbar */}
        <section className={`${styles.section} ${styles.scrollableSection} custom-scroll`}>
          {Object.values(props).map(item => (
            <div className={`${styles.constructorItem}`} key={item._id}>
              <DragIcon type='primary' />
              <ConstructorElement
                // type={item.type}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
                extraClass={`${styles.constructorElement} ml-2`}
              />
            </div>
          ))}
        </section>
        {/* bottom */}
        <div key='bottom'>
          <ConstructorElement
            type='bottom'
            text={props[0].name}
            price={props[0].price}
            thumbnail={props[0].image}
            isLocked={true}
            extraClass={`${styles.constructorElement}  ml-8`}
          />
        </div>
        <div className={`${styles.orderWrapper} py-10`}>
          <p className={`${styles.orderPrice} text text_type_digits-medium mr-2`}>
            {total ? total : 0}
          </p>
          <CurrencyIcon type='primary'/>
          <Button 
            htmlType='button' 
            type='primary' 
            size='large' 
            extraClass={`${styles.button}`}
            onClick={handleToggle}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  )
}

export default BurgerConstructor;
