import { Pages } from '../../utils/constants';

export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export enum MODAL_ACTIONS {
  MODAL_OPEN,
  MODAL_CLOSE, 
}

export interface IModal {
  type: keyof typeof MODAL_ACTIONS;
  prev?: Pages | null;
}

// const body = document.querySelector("body") as HTMLElement;

// export const showModal = (prev: Pages | null = null) => (dispatch: ({type}:IModal) => void) => {
//   dispatch({type: MODAL_OPEN, prev});
//   body.style.overflow = "hidden";
// };

// export const closeModal = () => (dispatch: ({type}:IModal) => void) => {
//   dispatch({type: MODAL_CLOSE});
//   body.style.overflow = "auto";
// };

// export const hideModal = () => (dispatch: ({type}:IModal) => void) => {
//   dispatch({type: MODAL_CLOSE, payload: null});
// };

