import React, { useEffect } from 'react';
import styles from './feed.module.scss';
import Stats from '../../components/stats';
import OrderCards from '../../components/order-cards';
import { RootState, useDispatch, useSelector } from '../../services';
import { connect, disconnect } from '../../services/actions/wsActions';
import { WS_API } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';


interface IFeedProps {
    props?: string;
}

export const Feed: React.FC<IFeedProps> = ({ props }) => {
  const { isLoading, isError } = useSelector((store: RootState) => store.ingredients);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  
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