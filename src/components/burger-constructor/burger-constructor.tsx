import { useReducer, useContext, useEffect, ReactNode, useState } from "react";

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


enum CountAction {
  ADD = 'add',
  REMOVE = 'remove',
}

interface ICountAction {
  type: CountAction;
  payload: number;
}

interface ICountState {
  count: number;
}


function reducer(state: ICountState, action: ICountAction) {
  const { type, payload } = action;

  switch (type) {
    case CountAction.ADD:
      return {
        ...state,
        count: state.count + payload,
      };
    case CountAction.REMOVE:
      return {
        ...state,
        count: state.count - payload,
      };
    default:
      return state;
  };
}

const BurgerConstructor = () => {
  const [total, dispatch] = useReducer(reducer, {count: 0});
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const { data } = useContext(IngredientsContext);
  const { recipe, setRecipe } = useContext(ConstructorContext);
  const { bun, setBun } = useContext(BunContext);
  const {
    showModal,
    handleToggle,
    handleHeading,
    modalHeading,
  } = useModalControl();
  const { makeRequest } = BurgerApi();
  const { setNumber } = useContext(OrderContext);

  const handleOrder = () => {
    const payload = {
      ingredients: [bun?._id, ...recipe.map((item) => item._id), bun?._id],
    };

    makeRequest(Requests.postOrder, payload as Payload)
      .then((response) => {
        setNumber(response as number);
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
      dispatch({ type: CountAction.ADD, payload: randomBun.price * 2 });

      const randomArray = getRandomArray(
        data["main" as keyof FilteredData].concat(
          data["sauce" as keyof FilteredData]
        )
      );
      setRecipe(randomArray);
      randomArray.forEach((item) => dispatch({ type: CountAction.ADD, payload: item.price }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // TODO need just to generate random recipe

  const handleDelete = (id: string, price: number) => {
    setRecipe(recipe.filter((item) => item._id !== id));
    dispatch({ type: CountAction.REMOVE, payload: price });
  };

  return (
    <>
      {modalContent && <Modal
        showModal={showModal}
        onClose={() => handleToggle(false)}
        modalHeading={modalHeading}
      >
        {modalContent}
      </Modal>}
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
            {total ? total.count : 0}
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
