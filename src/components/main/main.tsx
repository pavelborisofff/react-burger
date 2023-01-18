import  { useState }  from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { useGetData } from '../../hooks/burger-api';
import { IngredientsContext } from '../../contexts/ingredients-context';
import { ConstructorContext, BunContext, OrderContext } from '../../contexts/constructor-context';

import styles from './main.module.css';
import { Data } from '../../utils/types';


const Main = () => {
  const { isLoading, isError, data } = useGetData(),
        [bun, setBun] = useState({} as Data),
        [recepie, setRecepie] = useState([] as Data[]),
        [number, setNumber] = useState(0);

  return (
    <>
      <IngredientsContext.Provider value={data}> 
        <ConstructorContext.Provider value={{ recepie, setRecepie }}>
          <BunContext.Provider value={{ bun, setBun }}>
            <OrderContext.Provider value={{ number, setNumber }}>
              <main className={`${styles.main} container px-5`}>
                <h1 className={`${styles.header} text text text_type_main-medium mt-10 mb-5`} >
                  Соберите бургер
                </h1>
                {!data && isLoading && <p className={`${styles.loading} text text_type_main-default`}>Загрузка...</p>}
                {!data && isError && <p className={`${styles.error} text text_type_main-default`}>Что-то пошло не так :-/</p>}
                {Object.keys(data) && <BurgerIngredients />}
                {Object.keys(data) && <BurgerConstructor />}
              </main>
            </OrderContext.Provider>  
          </BunContext.Provider>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
};

export default Main;
