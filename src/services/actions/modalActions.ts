import { Pages } from '../../utils/constants';

export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export enum MODAL_ACTIONS {
  MODAL_OPEN,
  MODAL_CLOSE, 
}

export interface IModal {
  type: keyof typeof MODAL_ACTIONS;
  payload: any | null;
  prev?: Pages | null;
}

// export const hideModal = () => (dispatch: ({type}:IModal) => void) => {
//   dispatch({type: MODAL_CLOSE, payload: null});
// };

