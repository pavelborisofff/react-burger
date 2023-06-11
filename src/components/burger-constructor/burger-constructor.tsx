import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";

import styles from "./burger-constructor.module.scss";

import { RootState, useDispatch, useSelector } from "../../services";
import { Data } from '../../types/types';
import { BUN_ADD, BUN_REMOVE, INGREDIENT_ADD } from '../../services/actions/recipeActions';
import { RecipeItem } from './recipe-item';

import { OrderDetails } from '../order-details/order-details';
import { ORDER_RESET, orderPost } from '../../services/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../utils/constants';
import { useState } from 'react';
import { Modal } from '../modal/modal';


const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store: RootState) => store.auth); 
  const [showModal, setShowModal] = useState(false);

  const { bun, usedIngredients, bill } = useSelector((store: RootState) => store.recipe);

  const handlerOrder = async () => {
    if (!isAuth) {
      navigate(Pages.login);
      return;
    } 
    const body = {
      ingredients: [...usedIngredients.map(item => item._id), bun?._id].filter((id): id is string => !!id),
    };

    dispatch({ type: ORDER_RESET });
    dispatch(orderPost(body)); 
    setShowModal(true);
  }


  // Drop ingredient to recipe from burger-ingredients
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }), 
      drop(item: any) {
        changeRecipe(item);
  }});

  const changeRecipe = (item: Data) => {
    switch ('' + item.type) {
      case 'bun':
        if (bun) dispatch({ type: BUN_REMOVE });
        dispatch({ type: BUN_ADD, payload: item });
        break;
      case 'sauce':
      case 'main':
        const uuid = uuidv4();
        item.uuid = uuid;
        dispatch({ type: INGREDIENT_ADD, payload: item });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section className={`${styles.section} ${isHover ? styles.isHover : ''} section`} ref={dropTargetRef}>
        {/* top */}
        {!!bun && 
          <ConstructorElement
            type="top"
            text={bun?.name + " (верх)" || ""}
            price={bun?.price || 0}
            thumbnail={bun?.image || ""}
            isLocked={true}
            extraClass={`${styles.constructorElement} ml-8`}
          />
        }
        {!bun &&
          <div className={`${styles['constructor-element']} ${styles['constructor-element_pos_top']} ml-8`}>
            <p className="text text_type_main-medium">Пока без булки</p>
          </div>
        }
        {/* middle section with scrollbar */}
        <section
          className={`${styles.section} ${styles.scrollableSection} custom-scroll`}
        > 
          {!usedIngredients && <p className={`${styles.empty} text text_type_main-medium ml-8 p-10`}>Перетащите ингридиенты сюда</p>}
          {usedIngredients && usedIngredients.map((item, index) => (
            <div className={`${styles.constructorItem}`} key={item.uuid}>
              <RecipeItem item={item} index={index}/>
            </div>
          ))}
        </section>
        {/* bottom */}
        {!!bun && 
          <ConstructorElement
            type="bottom"
            text={bun?.name + " (низ)" || ""}
            price={bun?.price || 0}
            thumbnail={bun?.image || ""}
            isLocked={true}
            extraClass={`${styles.constructorElement} ml-8`}
          />
        }
        {!bun &&
          <div className={`${styles['constructor-element']} ${styles['constructor-element_pos_bottom']} ml-8`}>
            <p className="text text_type_main-medium">Пока без булки</p>
          </div>
        }
        {/* total and order */}
        <div className={`${styles.orderWrapper} py-10`}>
          <p
            className={`${styles.orderPrice} text text_type_digits-medium mr-2`}
          >
            {bill}
          </p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={`${styles.button}`}
            onClick={() => handlerOrder()}
            disabled={!bun}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {showModal && (
        <Modal title='Детали заказа' onClose={() => setShowModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
