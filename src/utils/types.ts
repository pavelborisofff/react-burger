import { Nutrients, Tabs } from './constants';

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
  tabId: string,
};

export type GetData = {
  isLoading: boolean,
  isError: boolean,
  data: FilteredData,
}

export type PostData = {
  isLoading: boolean,
  isError: boolean,
  response: {} | null,
}

export type Payload = {
  'ingredients': string[];
}

export type FilteredData = {
  [key in Tabs]: Data[]
}

export type NutrientsFactProps = {
  title: Nutrients,
  value?: number,
};

export type ModalOverlayProps = {
  onClose: () => void;
  children?: React.ReactNode;
};