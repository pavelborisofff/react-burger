import { useState } from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { Tabs } from "../../utils/constants";
import { FilteredData, Data } from "../../types/types";
import Ingredient from "./ingredient";

import styles from "./burger-ingredients.module.scss";

import { RootState } from '../../services';


const BurgerIngredients = () => {
  const [current, setCurrent] = useState<Tabs>(Tabs.bun);

  return (
    <section className={`${styles.section} section`}>
      {/* Types of ingredients */}
      <nav className={`${styles.nav}`}>
        <ul className={`${styles.navList}`}>
          {Object.entries(Tabs).map((tab) => (
            <li key={tab[0]} className={`${styles.navItem}`}>
              <a href={`#${tab[0]}`} className={`${styles.navLink}`}>
                <Tab
                  value={tab[0]}
                  active={current === tab[1]}
                  onClick={() => setCurrent(tab[1])}
                >
                  {tab[1]}
                </Tab>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Ingredients */}
      <ul className={`${styles.tabsList} custom-scroll`}>
        <IngredientsGroups />
      </ul>
    </section>
  );
};

const IngredientsGroups = () => {
  const ingredients = useSelector((store: RootState) => store.ingredients.ingredients); 

  return (
    <>
      {ingredients &&
        Object.entries(Tabs).map(([key, value]) => {         
          const filteredData = ingredients[key as keyof FilteredData];
          return (
            <Group key={key} tabId={key} title={value} data={filteredData} />
          );
        })}
    </>
  );
};

type TabItemProps = {
  title: Tabs;
  tabId: string;
  data?: Data[];
};

const Group = (props: TabItemProps) => {
  return (
    <li className={`pt-10`} id={props.tabId}>
      <h2 className={`text text_type_main-medium`}>{props.title}</h2>
      <ul className={`${styles.ingredientsList}`}>
        {props.data &&
          props.data.map((item) => <Ingredient key={item._id} {...item} />)}
      </ul>
    </li>
  );
};

export default BurgerIngredients;
