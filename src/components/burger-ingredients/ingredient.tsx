import {
  Counter,
  CurrencyIcon,
  LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import styles from "./burger-ingredients.module.scss";

import { Data } from "../../types/types";
import { RootState, useSelector } from '../../services';


const Ingredient = (props: Data) => {
  let location = useLocation();
  const { bun, usedCount } = useSelector((store: RootState) => store.recipe);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...props },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <li 
      className={`${styles.ingredientsItem} ${isDrag ? styles.isDrag : ''}`} 
      ref={bun?._id === props._id ? null : dragRef}
      data-testid={props._id}
    >
      <Link 
        to={{ pathname: `/ingredients/${props._id}` }}
        state={{ background: location, id: props._id }}
      >
        {"" + props.type === "bun" && bun?._id === props._id && (
          <>
            <LockIcon type="primary" />
            <Counter
              count={2}
              size="default"
              extraClass={`${styles.counter} m-1`}
            />
          </>
        )}
        {"" + props.type !== "bun" && !!usedCount[props._id] && (
          <Counter
            count={usedCount[props._id]}
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
      </Link>
    </li>
  );
};

export default Ingredient;
