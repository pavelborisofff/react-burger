import  { useState }  from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { useGetData } from '../../hooks/burger-api';
import { IngredientsContext } from '../../contexts/ingredients-context';
import { ConstructorContext, BunContext } from '../../contexts/constructor-context';

import styles from './main.module.css';
import { Data } from '../../utils/types';


const Main = () => {
  const { isLoading, isError, data } = useGetData(),
        [bun, setBun] = useState<Data>({} as Data);

  return (
    <>
      <IngredientsContext.Provider value={data}> 
        <ConstructorContext.Provider value={data}>
          <BunContext.Provider value={{bun, setBun}}>
            <main className={`${styles.main} container px-5`}>
              <h1 className={`${styles.header} text text text_type_main-medium mt-10 mb-5`} >
                Соберите бургер
              </h1>
              {!data && isLoading && <p className={`${styles.loading} text text_type_main-default`}>Загрузка...</p>}
              {!data && isError && <p className={`${styles.error} text text_type_main-default`}>Что-то пошло не так :-/</p>}
              {data.length > 0 && <BurgerIngredients />}
              {data.length > 0 && <BurgerConstructor />}
            </main>
          </BunContext.Provider>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
};

export default Main;
