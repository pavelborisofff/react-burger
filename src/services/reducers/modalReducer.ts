import { ReactNode } from 'react';
import { IModal, MODAL_OPEN, MODAL_CLOSE } from '../actions/modalActions';


interface IModalPayload {
  heading: string;
  content?: ReactNode;
}

interface IModalState {
  isOpen: boolean;
  payload: IModalPayload | null;
}

const initialModal:IModalState = {
  isOpen: false,
  payload: null,
};


const modalReducer = (state = initialModal, action: IModal):IModalState => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        isOpen: true,
        payload: action.payload,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
        payload: null,
      };
    default:
      return state;
  }
};


export default modalReducer;
