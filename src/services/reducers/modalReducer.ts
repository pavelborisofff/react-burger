import { ReactNode } from 'react';
import { IModal, MODAL_OPEN, MODAL_CLOSE } from '../actions/modalActions';
import { Pages } from '../../utils/constants';


interface IModalPayload {
  heading: string;
  content?: ReactNode;
}

interface IModalState {
  isOpen: boolean;
  payload: IModalPayload | null;
  prev?: Pages | null;
}

const initialModal:IModalState = {
  isOpen: false,
  payload: null,
  prev: null,
};

const modalReducer = (state = initialModal, action: IModal):IModalState => {
  switch (action.type) {
    case MODAL_OPEN:

      return {
        ...state,
        isOpen: true,
        prev: action.prev,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
        prev: null,
      };
    default:
      return state;
  }
};


export default modalReducer;
