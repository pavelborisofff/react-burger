import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";

import { Tabs } from "../../utils/constants";
import { FilteredData, Data } from "../../types/types";
import Ingredient from "./ingredient";

import styles from "./burger-ingredients.module.scss";

import { RootState } from '../../services';


const BurgerIngredients = () => {
  const [current, setCurrent] = useState<Tabs>(Tabs.bun);
  const [activeRatio, setActiveRatio] = useState<{ [key: string]: number }>({bun: 1, sauce: 0, main: 0});
  const ingredients = useSelector((store: RootState) => store.ingredients.ingredients); 

  const onScroll = (id: string, ratio: number) => {
    setActiveRatio((prev) => ({...prev, [id]: ratio}));
    const key = Object.entries(activeRatio).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    if (current !== Tabs[key as keyof typeof Tabs]) {
      setCurrent(Tabs[key as keyof typeof Tabs]);
    };
  };

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
        {ingredients &&
          Object.entries(Tabs).map(([key, value]) => {         
            const filteredData = ingredients[key as keyof FilteredData];
            return (
              <Group key={key} tabId={key} title={value} data={filteredData} onScroll={onScroll}/>
            );
          })
        }
      </ul>
    </section>
  );
};

type TabItemProps = {
  title: Tabs;
  tabId: string;
  data?: Data[];
  onScroll: (id: string, ratio: number) => void;
};

const Group = (props: TabItemProps) => {
  const {ref, inView, entry} = useInView({
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
  });  

  useEffect(() => {
    if (inView && entry) {
      props.onScroll(entry.target.id, entry.intersectionRatio + (entry.target.id === 'bun' ? 0.2 : 0));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, entry]); // props as dependence cause infinite loop

  return (
    <li className={`pt-10`} id={props.tabId} ref={ref}>
      <h2 className={`text text_type_main-medium`}>{props.title}</h2>
      <ul className={`${styles.ingredientsList}`}>
        {props.data &&
          props.data.map((item) => <Ingredient key={item._id} {...item} />)}
      </ul>
    </li>
  );
};

export default BurgerIngredients;
