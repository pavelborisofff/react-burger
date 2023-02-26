import { ReactNode } from 'react';

export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';
// export const MODAL_SET_DATA = 'MODAL_SET_DATA';

export enum MODAL_ACTIONS {
  MODAL_OPEN,
  MODAL_CLOSE, 
}

export interface IModal {
  type: keyof typeof MODAL_ACTIONS;
  payload: any | null;
}

// interface IModalPayload {
//   heading: string;
//   onClose: () => void;
//   children?: ReactNode;
// }


// export const showModal = (payload: IModalPayload) => (dispatchFunc: ({type}:IModal) => void) => {
//   dispatchFunc({type: MODAL_ACTIONS.MODAL_OPEN, payload});
// };

export const hideModal = () => (dispatchFunc: ({type}:IModal) => void) => {
  dispatchFunc({type: MODAL_CLOSE, payload: null});
};



// export const showModal = (payload: any): IModal => ({
//   type: MODAL_ACTIONS.MODAL_OPEN,
//   payload,
// });

// export const hideModal = (): IModal => ({
//   type: MODAL_ACTIONS.MODAL_CLOSE,
//   payload: null,
// });

