import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.scss";

import { RootState } from "../../services";
import { Data } from '../../types/types';
import { BUN_ADD, BUN_REMOVE, INGREDIENT_ADD } from '../../services/actions/recipeActions';
import { RecipeItem } from './recipe-item';

import { MODAL_OPEN } from '../../services/actions/modalActions';
import { OrderDetails } from '../order-details/order-details';
import { orderPost } from '../../services/actions/orderActions';


const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, usedIngredients, bill } = useSelector((store: RootState) => store.recipe);

  const handlerOrder = async () => {
    const body = {
      ingredients: [...usedIngredients.map(item => item._id), bun?._id || null]
    }
    dispatch(orderPost(body as any) as any); // TODO: не знаю, что тут сделать, чтобы не было ошибки в TS
    dispatch({
      type: MODAL_OPEN,
      payload: {
        heading: 'Детали заказа',
        content: <OrderDetails />
      }
    });
  }


  // Drop ingredient to recipe from burger-ingredients
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }), 
      drop(item: any) {  // TODO: не знаю, что тут сделать, чтобы не было ошибки в TS
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
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;
