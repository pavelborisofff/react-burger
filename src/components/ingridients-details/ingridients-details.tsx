import { Data, NutrientsFactProps } from '../../utils/types';
import { Nutrients } from '../../utils/constants';

import styles from './ingridients-details.module.css';


const IngridientNutrients = (props:NutrientsFactProps) => {
  return (
    <li className={`text text_type_main-default`}>
      <span className={`text text_type_main-small text_color_inactive`}>{props.title}</span>
      <span className={`text text_type_digits-default text_color_inactive pt-2`}>{props.value}</span>
    </li>
  );
};

const IngredientDetails = (props:Data) => {
  return (
    <div className={`${styles.details} mt-4 mb-15`}>
      <img src={props.image_large} alt={props.name} className={`${styles.ingridientsImage}`}/>
      <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`}>{props.name}</p>
      <ul className={`${styles.nutrientsList}`}>
        {Object.entries(Nutrients).map(([key, value]) => {
          const propsKey = key as keyof Data,
                propsValue = props[propsKey];

          return (
            <IngridientNutrients key={key} title={value} value={+propsValue}/>
          );
        })}
      </ul>
    </div>
  )
};

export { IngredientDetails };
