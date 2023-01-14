import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useGetData } from '../../utils/burger-api';

import styles from './main.module.css';


const Main = () => {
  const { isLoading, isError, data } = useGetData();
  
  return (
    <main className={`${styles.main} container px-5`}>
      <h1 className={`${styles.header} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      {!data && isLoading && <p className={`${styles.loading} text text_type_main-default`}>Загрузка...</p>}
      {!data && isError && <p className={`${styles.error} text text_type_main-default`}>Что-то пошло не так :-/</p>}
      {data.length > 0 && <BurgerIngredients {...data}/>}
      {data.length > 0 && <BurgerConstructor {...data}/>}
    </main>
  );
};

export default Main;
