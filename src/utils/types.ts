import { Tabs } from './constants';

type Data = {
  _id: string,
  name: string,
  type: Tabs,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
};

// type DataItemProps = {
//   [key in Tabs]?: Data[]
// };

type DataResponse = {
  data: Data[],
}

type NavItemProps = {
  text: string,
  active?: boolean,
  children?: React.ReactNode,
};

type TabItemProps = {
  title: Tabs,
  data?: Data[],
};



export type { Data, NavItemProps, TabItemProps, DataResponse };