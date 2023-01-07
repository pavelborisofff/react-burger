import { useEffect, useState } from 'react';
import axios from 'axios';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DataUrl } from '../../utils/constants';
import { DataResponse } from '../../utils/types';

import styles from './main.module.css';


// const repackData = (data: DataResponse):DataItemProps => {
//   const repackedData:DataItemProps = {};

//   data.data.forEach(item => {
//     if (repackedData[item.type] === undefined) {
//       repackedData[item.type] = [];
//     }

//     repackedData[item.type]?.push(item);
//   });

//   return repackedData;
// }


const Main = () => {
  const [data, setData] = useState<DataResponse>(),
        [error, setError] = useState<string>();

  useEffect(() => {
    axios.get<DataResponse>(DataUrl)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
  }, []);


  return (
    <main className={`${styles.main} container px-5`}>
      <h1 className={`${styles.header} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      {!data && !error && <p className={`${styles.loading} text text_type_main-default`}>Загрузка...</p>}
      {!data && error && <p className={`${styles.error} text text_type_main-default`}>Что-то пошло не так :-/ {error}</p>}
      {data && <BurgerIngredients {...data.data}/>}
      {data && <BurgerConstructor {...data.data}/>}
    </main>
  );
};

export default Main;