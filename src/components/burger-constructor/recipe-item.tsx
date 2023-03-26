import { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { INGREDIENT_REMOVE, INGREDIENTS_SET } from '../../services/actions/recipeActions';

import styles from "./burger-constructor.module.scss";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from '../../services';


const sortRecipe = (dragIndex: number, hoverIndex: number, arr: Array<any>) => {
  const item = arr[dragIndex];
  const sortArr = [...arr]
  
  sortArr.splice(dragIndex, 1)
  sortArr.splice(hoverIndex, 0, item)

  return sortArr
};

interface IItem {
  name: string;
  price: number;
  image: string; 
}

interface RecipeItemProps {
  item: IItem,
  index: number,
}

export const RecipeItem = ({ item, index }:RecipeItemProps) => {
  const dispatch = useDispatch();
  const { usedIngredients } = useSelector((store: RootState) => store.recipe);

  const handleDelete = (item:IItem) => dispatch({ type: INGREDIENT_REMOVE, payload: item});

  const itemRef = useRef<HTMLDivElement>(null);

  const [, dropItem] = useDrop({
      accept: ["inner"],
      collect(monitor) {},
      // TODO: тут не справился с типизацией, не понимаю как правильно указать типы
      hover(item: any, monitor: DropTargetMonitor) {
          if (!itemRef.current) return;

          const dragIndex = item.index;
          const hoverIndex = index;

          if (dragIndex === hoverIndex) return;


          const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset() || { x: 0, y: 0 };
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

          dispatch({type: INGREDIENTS_SET, payload: sortRecipe(dragIndex, hoverIndex, usedIngredients)});

          item.index = hoverIndex;
      }
  });
  const [, dragItem] = useDrag({
      type: "inner",
      item: () => {
          return {index};
      },
      collect: (monitor) => ({
          isDragging: monitor.isDragging()
      })
  });

  dragItem(dropItem(itemRef));

  return (
    <div className={`${styles.constructorItem}`} ref={itemRef}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        isLocked={false}
        extraClass={`${styles.constructorElement} ml-2`}
        handleClose={() => handleDelete(item)}
      />
    </div>
  )
};
