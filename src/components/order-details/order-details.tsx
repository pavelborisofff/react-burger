import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { OrderStatus } from "../../utils/constants";

import styles from "./order-details.module.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../services';


const OrderDetails = () => {
  const { orderNumber } = useSelector((store: RootState) => store.order);

  return (
    <div className={`${styles.details} mt-4 mb-15`}>
      <p className={`${styles.number} text text_type_digits-large`}>
        {orderNumber || "---"}
      </p>
      <p className={`text text_type_main-medium pt-8`}>Идентификатор заказа</p>
      <div className={`${styles.icon} my-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className={`text text_type_main-medium mt-15`}>
        Ваш заказ {orderNumber ? OrderStatus.inProgress : OrderStatus.pending}
      </p>
      <p className={`text text_type_main-default text_color_inactive mt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export { OrderDetails };
