import { Tabs } from "../utils/constants";

export type Data = {
  _id: string;
  name: string;
  type: Tabs;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string | null;
};

export type DataResponse = {
  data: Data[];
};

export type Payload = {
  ingredients: string[];
};

export type FilteredData = {
  [key in Tabs]: Data[];
};


export type ModalOverlayProps = {
  onClose: () => void;
  children?: React.ReactNode;
};
