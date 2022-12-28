import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Tabs } from '../../utils/constants';
import { TabItemProps, Data, DataResponse } from '../../utils/types';

import styles from './burger-constructor.module.css';



const TabItem = (props: TabItemProps) => {
  console.log(props);

  return (
    <li className={`${styles.tabsItem} pt-10`}>
      {props.title}
    </li>
  );
};


const BurgerConstructor = (props:{Tabs:Data[]}) => {
  const [current, setCurrent] = useState(Tabs.bun);  

  // console.log(props);
  // console.log(Tabs);
  Object.entries(props).map(k => {
    const x = k[0];
    // console.log(k[0], k[1])
    console.log(props[x]);
    

    return null;
  });
  // Object.entries(Tabs).map(k => (console.log(props.get(k[0]))));

  return (
    <section className={`${styles.section} section`}>
      <nav className={`${styles.nav}`}>
        <ul className={`${styles.navList}`}>
          {Object.values(Tabs).map(tab => (
            <li key={tab} className={`${styles.navItem}`}>
              <Tab value={tab} active={current === tab} onClick={() => setCurrent(tab)}>
                {tab}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>
      <ul className={`${styles.tabsList}`}>
        {Object.entries(Tabs).map(tab => (
          <TabItem key={tab[0]} title={tab[1]} />
        ))}
      </ul>
    </section>
  )
}

export default BurgerConstructor;
