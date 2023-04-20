import React from 'react';
import styles from './feed.module.scss';
import Stats from '../../components/stats';
import OrderCards from '../../components/order-cards';


interface IFeedProps {
    props?: string;
}

export const Feed: React.FC<IFeedProps> = ({ props }) => {
  // const { isLoading, isError } = useSelector((store: RootState) => store.ingredients);
  const { isLoading, isError } = {isLoading: false, isError: false};

  
    return (
      <main className={`${styles.feed} container px-5`}>
        <h1
          className={`${styles.header} text text text_type_main-medium mt-10 mb-5`}
        >
          Лента заказов
        </h1>
        {!isLoading && !isError &&
          <>
            <OrderCards />
            <Stats />
          </>
        }
      </main>
    );
};

export default Feed;