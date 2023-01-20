import { useReducer, useContext, useEffect } from "react";

import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";

import { Data, FilteredData, Payload } from "../../types/types";
import { useModalControl } from "../../hooks/modal-control";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";

import { IngredientsContext } from "../../contexts/ingredients-context";
import {
  BunContext,
  ConstructorContext,
  OrderContext,
} from "../../contexts/constructor-context";

import styles from "./burger-constructor.module.scss";
import { BurgerApi, Requests } from "../../hooks/burger-api";

function reducer(state: number, action: number) {
  return state + action;
}

const BurgerConstructor = () => {
  const [total, dispatch] = useReducer(reducer, 0);
  const { data } = useContext(IngredientsContext);
  const { recipe, setRecipe } = useContext(ConstructorContext);
  const { bun, setBun } = useContext(BunContext);
  const {
    showModal,
    handleToggle,
    handleHeading,
    setModalContent,
    modalHeading,
    modalContent,
  } = useModalControl();
  const { makeRequest } = BurgerApi();
  const { setNumber } = useContext(OrderContext);

  const handleOrder = () => {
    const payload = {
      ingredients: [bun?._id, ...recipe.map((item) => item._id), bun?._id],
    };

    makeRequest(Requests.postOrder, payload as Payload)
      .then((response) => {
        setNumber(response);
      })
      .catch((error) => {
        console.log(error);
      });

    handleHeading("");
    setModalContent(<OrderDetails />);
    handleToggle(true);
  };

  // TODO just to imitate order
  useEffect(() => {
    const getRandomArray = (arr: Data[]) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random()),
        num = Math.floor(Math.random() * arr.length) + 1;

      return shuffled.slice(0, num);
    };

    if (data && "bun" in data) {
      const randomBun =
        data["bun" as keyof FilteredData][
          Math.floor(Math.random() * data["bun" as keyof FilteredData].length)
        ];
      setBun(randomBun);
      dispatch(+randomBun.price * 2);

      const randomArray = getRandomArray(
        data["main" as keyof FilteredData].concat(
          data["sauce" as keyof FilteredData]
        )
      );
      setRecipe(randomArray);
      randomArray.forEach((item) => dispatch(+item.price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // TODO need just to generate random recipe

  const handleDelete = (id: string, price: number) => {
    setRecipe(recipe.filter((item) => item._id !== id));
    dispatch(-price);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        onClose={() => handleToggle(false)}
        modalHeading={modalHeading}
      >
        {modalContent}
      </Modal>
      <section className={`${styles.section} section`}>
        {/* top */}
        <ConstructorElement
          type="top"
          text={bun?.name + " (верх)" || ""}
          price={bun?.price || 0}
          thumbnail={bun?.image || ""}
          isLocked={true}
          extraClass={`${styles.constructorElement} ml-8`}
        />
        {/* middle section with scrollbar */}
        <section
          className={`${styles.section} ${styles.scrollableSection} custom-scroll`}
        >
          {recipe.map((item) => (
            <div className={`${styles.constructorItem}`} key={uuidv4()}>
              <DragIcon type="primary" />
              <ConstructorElement
                // type={item.type}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                isLocked={false}
                extraClass={`${styles.constructorElement} ml-2`}
                handleClose={() => handleDelete(item._id, item.price)}
              />
            </div>
          ))}
        </section>
        {/* bottom */}
        <div key="bottom">
          <ConstructorElement
            type="bottom"
            text={bun?.name + " (низ)" || ""}
            price={bun?.price || 0}
            thumbnail={bun?.image || ""}
            isLocked={true}
            extraClass={`${styles.constructorElement} ml-8`}
          />
        </div>
        {/* total and order */}
        <div className={`${styles.orderWrapper} py-10`}>
          <p
            className={`${styles.orderPrice} text text_type_digits-medium mr-2`}
          >
            {total ? total : 0}
          </p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={`${styles.button}`}
            onClick={handleOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;
