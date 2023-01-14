import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { useGetData } from '../../hooks/burger-api';
import { useModalControl } from '../../hooks/modal-control';
import { Modal } from '../modal/modal';

import styles from './main.module.css';


const Main = () => {
  const { isLoading, isError, data } = useGetData(),
        { showModal, handleToggle } = useModalControl();

  return (
    <>
      <Modal showModal={showModal} onClose={handleToggle} heading='Детали'></Modal>
      <main className={`${styles.main} container px-5`}>
        <button onClick={handleToggle}>click</button>
        <h1 className={`${styles.header} text text text_type_main-medium mt-10 mb-5`} >
          Соберите бургер
        </h1>
        {!data && isLoading && <p className={`${styles.loading} text text_type_main-default`}>Загрузка...</p>}
        {!data && isError && <p className={`${styles.error} text text_type_main-default`}>Что-то пошло не так :-/</p>}
        {data.length > 0 && <BurgerIngredients {...data}/>}
        {data.length > 0 && <BurgerConstructor {...data}/>}
      </main>
    </>
  );
};

export default Main;
