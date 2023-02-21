import { useState, useEffect } from "react";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { BurgerApi, Requests } from "../../hooks/burger-api";
import { IngredientsContext } from "../../contexts/ingredients-context";
import {
  ConstructorContext,
  BunContext,
  OrderContext,
} from "../../contexts/constructor-context";
import { Data, FilteredData } from "../../types/types";

import styles from "./main.module.scss";

const Main = () => {
  const { isLoading, isError, makeRequest } = BurgerApi();
  const [ data, setData ] = useState<FilteredData | null>(null);
  const [ bun, setBun ] = useState<Data | null>(null);
  const [ recipe, setRecipe ] = useState<Data[]>([] as Data[]);
  const [ number, setNumber ] = useState<number | null>(null);

  useEffect(() => {
    makeRequest(Requests.getData)
      .then((response) => {
        setData(response as FilteredData);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO because we need Data only once on the first render

  return (
    <>
      <IngredientsContext.Provider value={{ data, setData }}>
        <ConstructorContext.Provider value={{ recipe, setRecipe }}>
          <BunContext.Provider value={{ bun, setBun }}>
            <OrderContext.Provider value={{ number, setNumber }}>
              <main className={`${styles.main} container px-5`}>
                <h1
                  className={`${styles.header} text text text_type_main-medium mt-10 mb-5`}
                >
                  Соберите бургер
                </h1>
                {!data && isLoading && (
                  <p
                    className={`${styles.loading} text text_type_main-default`}
                  >
                    Загрузка...
                  </p>
                )}
                {!data && isError && (
                  <p className={`${styles.error} text text_type_main-default`}>
                    Что-то пошло не так :-/
                  </p>
                )}
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            </OrderContext.Provider>
          </BunContext.Provider>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </>
  );
};

export default Main;
