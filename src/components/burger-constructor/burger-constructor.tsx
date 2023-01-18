import { useReducer, useContext, useEffect } from 'react';

import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Data, FilteredData, Payload } from '../../utils/types';
import { useModalControl } from '../../hooks/modal-control';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import { IngredientsContext } from '../../contexts/ingredients-context';
import { BunContext, ConstructorContext } from '../../contexts/constructor-context';

import styles from './burger-constructor.module.css';
import { usePostOrder } from '../../hooks/burger-api';


function reducer(state: number, action: number) {
  return state + action;
}

const BurgerConstructor = () => {
  const [total, dispatch] = useReducer(reducer, 0),
        data = useContext<FilteredData>(IngredientsContext),
        { recepie, setRecepie } = useContext(ConstructorContext),
        { bun, setBun } = useContext(BunContext),
        { showModal, handleToggle, handleHeading, setModalContent, modalHeading, modalContent } = useModalControl(),
        { setPayload } = usePostOrder();
    
  const handleOrder = () => { 
    const payload = {
            'ingredients': [bun?._id, ...recepie.map(item => item._id), bun?._id],
          };
    setPayload(payload as Payload);
    handleHeading('');
    setModalContent(<OrderDetails />);
    handleToggle(true);
  };

  // useEffect(() => {
  //   const payload = {
  //     'ingredients': [bun?._id, ...recepie.map(item => item._id), bun?._id],
  //   };
  //   usePostOrder(payload as Payload);
  // }, [bun, recepie]);

  // just to imitate order
  useEffect(() => {
    const getRandomArray = (arr: Data[]) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random()),
            num = Math.floor(Math.random() * arr.length) + 1;
  
      return shuffled.slice(0, num);
    };

    if ('bun' in data) {
      const randomBun = data['bun' as keyof FilteredData][Math.floor(Math.random() * data['bun' as keyof FilteredData].length)];
      setBun(randomBun);
      dispatch(+ randomBun.price * 2);

      const randomArray = getRandomArray(data['main' as keyof FilteredData].concat(data['sauce' as keyof FilteredData]));
      setRecepie(randomArray);
      randomArray.forEach(item => dispatch(+ item.price));
    }
  }, [data]);


  const handleDelete = (id: string, price: number) => {
    setRecepie(prev => prev.filter(item => item._id !== id));
    dispatch(- price);
  };
  

  return (
    <>
      <Modal showModal={showModal} onClose={() => handleToggle(false)} modalHeading={modalHeading}>{modalContent}</Modal>
      <section className={`${styles.section} section`}>
        {/* top */}
        <ConstructorElement
          type='top'
          text={bun?.name || ''}
          price={bun?.price || 0}
          thumbnail={bun?.image || ''}
          isLocked={true}
          extraClass={`${styles.constructorElement} ml-8`}
        />
        {/* middle section with scrollbar */}
        <section className={`${styles.section} ${styles.scrollableSection} custom-scroll`}>
          {recepie.map(item => (
            <div className={`${styles.constructorItem}`} key={item._id}>
              <DragIcon type='primary' />
              <ConstructorElement
                // type={item.type}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
                extraClass={`${styles.constructorElement} ml-2`}
                handleClose={() => handleDelete(item._id, item.price)}
              />
            </div>
          ))}
        </section>
        {/* bottom */}
        <div key='bottom'>
        <ConstructorElement
          type='bottom'
          text={bun?.name || ''}
          price={bun?.price || 0}
          thumbnail={bun?.image || ''}
          isLocked={true}
          extraClass={`${styles.constructorElement} ml-8`}
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
