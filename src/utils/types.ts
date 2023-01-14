import { Tabs } from './constants';

export type Data = {
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

export type DataResponse = {
  data: Data[],
}

export type NavItemProps = {
  text: string,
  active?: boolean,
  children?: React.ReactNode,
};

export type TabItemProps = {
  title: Tabs,
  data?: Data[],
};

export type GetData = {
  isLoading: boolean,
  isError: boolean,
  data: Data[],
}
