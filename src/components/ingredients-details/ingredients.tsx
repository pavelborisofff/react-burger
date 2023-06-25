import { Data } from "../../types/types";

import styles from "./ingredients-details.module.scss";


enum Nutrients {
  calories = "Калории,ккал",
  proteins = "Белки, г",
  fat = "Жиры, г",
  carbohydrates = "Углеводы, г",
}

export type NutrientsFactProps = {
  title: Nutrients;
  value?: number;
};

const IngredientsNutrients = (props: NutrientsFactProps) => {
  return (
    <li className={`text text_type_main-default`}>
      <span className={`text text_type_main-small text_color_inactive`}>
        {props.title}
      </span>
      <span
        className={`text text_type_digits-default text_color_inactive pt-2`}
      >
        {props.value}
      </span>
    </li>
  );
};

const IngredientDetails = (props: Data) => {
  return (
    <div className={`${styles.details} mt-4 mb-15`}>
      <img
        src={props.image_large}
        alt={props.name}
        className={`${styles.ingredientsImage}`}
      />
      <p className={`${styles.name} text text_type_main-medium pt-4 pb-8`} data-testid='ingredient-name'>
        {props.name}
      </p>
      <ul className={`${styles.nutrientsList}`}>
        {Object.entries(Nutrients).map(([key, value]) => {
          const propsKey = key as keyof Data,
            propsValue = props[propsKey]?.toString() || "";

          return (
            <IngredientsNutrients key={key} title={value} value={+propsValue} />
          );
        })}
      </ul>
    </div>
  );
};

export { IngredientDetails };
