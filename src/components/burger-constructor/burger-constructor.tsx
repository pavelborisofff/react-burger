import { useState, useContext } from 'react';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Data } from '../../utils/types';
import { useModalControl } from '../../hooks/modal-control';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import { IngredientsContext } from '../../contexts/ingredients-context';

import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const [total, setTotal] = useState<number>(),
        data = useContext<Data[]>(IngredientsContext),
        { showModal, handleToggle, handleHeading, setModalContent, modalHeading, modalContent } = useModalControl();
        

  const handleOrder = () => {
    handleHeading('');
    setModalContent(<OrderDetails />);
    handleToggle(true);
  };

  return (
    <>
      <Modal showModal={showModal} onClose={() => handleToggle(false)} modalHeading={modalHeading}>{modalContent}</Modal>
      <section className={`${styles.section} section`}>
        {/* top */}
        <ConstructorElement
          type='top'
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
          isLocked={true}
          extraClass={`${styles.constructorElement} ml-8`}
        />
        {/* middle section with scrollbar */}
        <section className={`${styles.section} ${styles.scrollableSection} custom-scroll`}>
          {Object.values(data).map(item => (
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
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
            isLocked={true}
            extraClass={`${styles.constructorElement}  ml-8`}
          />
        </div>
        {/* total and order */}
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
            onClick={handleOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  )
}

export default BurgerConstructor;
