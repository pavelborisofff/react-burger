import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./main.module.scss";

import { RootState, useSelector } from '../../services';


const Main = () => {
  const { isLoading, isError } = useSelector((store: RootState) => store.ingredients);

  return (
    <main className={`${styles.main} container px-5`}>
      <h1
        className={`${styles.header} text text text_type_main-medium mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      {isLoading && (
        <p
          className={`${styles.loading} text text_type_main-default`}
        >
          Загрузка...
        </p>
      )}
      {isError && (
        <p className={`${styles.error} text text_type_main-default`}>
          Что-то пошло не так :-/
        </p>
      )}
      {!isLoading && !isError &&
        <DndProvider backend={ HTML5Backend }>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
    </main>
  );
};

export default Main;
