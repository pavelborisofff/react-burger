import { useContext } from "react";

import {
  Counter,
  CurrencyIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Data } from "../../types/types";
import {
  BunContext,
  ConstructorContext,
} from "../../contexts/constructor-context";
import { useModalControl } from "../../hooks/modal-control";

import { IngredientDetails } from "../ingredients-details/ingredients";
import { Modal } from "../modal/modal";

import styles from "./burger-ingredients.module.scss";

const Ingredient = (props: Data) => {
  const {
    showModal,
    handleToggle,
    handleHeading,
    setModalContent,
    modalHeading,
    modalContent,
  } = useModalControl();
  const { bun } = useContext(BunContext);
  const { recipe } = useContext(ConstructorContext);
  const count = recipe.filter((item) => item._id === props._id).length;

  const handleIngredient = () => {
    handleHeading("Детали ингридиента");
    setModalContent(<IngredientDetails {...props} />);
    handleToggle(true);
  };

  return (
    <li className={`${styles.ingredientsItem}`} onClick={handleIngredient}>
      {"" + props.type === "bun" && bun?._id === props._id && (
        <LockIcon type="primary" />
      )}
      <Modal
        showModal={showModal}
        onClose={() => handleToggle(false)}
        modalHeading={modalHeading}
      >
        {modalContent}
      </Modal>
      {!!count && (
        <Counter
          count={count}
          size="default"
          extraClass={`${styles.counter} m-1`}
        />
      )}
      <img
        src={props.image}
        alt={props.name}
        className={`${styles.ingredientsImage}`}
      />
      <div className={`${styles.ingredientsPrice}`}>
        <p className={`text text_type_digits-default pr-2`}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredientsName} text text_type_main-default`}>
        {props.name}
      </p>
    </li>
  );
};

export default Ingredient;
