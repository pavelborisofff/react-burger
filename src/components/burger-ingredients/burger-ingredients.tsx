import { useState, useContext } from 'react';

import { Tab, CurrencyIcon, Counter,LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Tabs } from '../../utils/constants';
import { TabItemProps, Data } from '../../utils/types';
import { useModalControl } from '../../hooks/modal-control';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingridients-details/ingridients-details';

import { IngredientsContext } from '../../contexts/ingredients-context';
import { ConstructorContext, BunContext } from '../../contexts/constructor-context';

import styles from './burger-ingredients.module.css';


const Ingridient = (props: Data) => {
  const { showModal, handleToggle, handleHeading, setModalContent, modalHeading, modalContent } = useModalControl();
  // const {bun, setBun} = useContext(BunContext);

  const handleIngridient = () => {
    handleHeading('Детали ингридиента');
    setModalContent(<IngredientDetails {...props} />);
    handleToggle(true);
  };
  
  if ('' + props.type === 'bun' ) {

  };

  

  return (
    <li className={`${styles.ingridientsItem}`} onClick={handleIngridient}>
      <LockIcon type="primary" />
      <Modal showModal={showModal} onClose={() => handleToggle(false)} modalHeading={modalHeading}>{modalContent}</Modal>
      {!props.__v && <Counter count={props.__v} size='default' extraClass={`${styles.counter} m-1`} />}
      <img src={props.image} alt={props.name} className={`${styles.ingridientsImage}`}/>
      <div className={`${styles.ingridientsPrice}`}> 
        <p className={`text text_type_digits-default pr-2`}>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingridientsName} text text_type_main-default`}>{props.name}</p>
    </li>
  );
};


const TabItem = (props: TabItemProps) => {
  return (
    <li className={`pt-10`} id={props.tabId}>
      <h2 className={`text text_type_main-medium`}>{props.title}</h2>
      <ul className={`${styles.ingridientsList}`}>
        {props.data && props.data.map(item => (
          <Ingridient {...item} key={item._id}/>
        ))}
      </ul>
    </li>
  );
};


const BurgerIngredients = () => {
  const [current, setCurrent] = useState(Tabs.bun);
  const data = useContext<Data[]>(IngredientsContext);

  return (
    <>
      <section className={`${styles.section} section`}>
        {/* Types of ingridients */}
        <nav className={`${styles.nav}`}>
          <ul className={`${styles.navList}`}>
            {Object.entries(Tabs).map(tab => (
              <li key={tab[0]} className={`${styles.navItem}`}>
                <a href={`#${tab[0]}`} className={`${styles.navLink}`}>
                  <Tab value={tab[0]} active={current === tab[1]} onClick={() => setCurrent(tab[1])}>
                    {tab[1]}
                  </Tab>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Ingridients */}
        <ul className={`${styles.tabsList} custom-scroll`}>
          {Object.entries(Tabs).map(tab => {
            const filteredData = Object.values(data).filter(item => item.type === tab[0]);            

            return (
              <TabItem key={tab[0]} tabId={tab[0]} title={tab[1]} data={filteredData} />
            );
          })}
        </ul>
      </section>
    </>
  )
}

export default BurgerIngredients;
