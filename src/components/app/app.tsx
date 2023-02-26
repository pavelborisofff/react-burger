import { useSelector } from "react-redux";

import useIngredients from '../../hooks/api';
import Header from "../header/header";
import Main from "../main/main";

import { Modal } from '../modal/modal';

import "./app.module.scss";

import { RootState } from '../../services';


function App() {
  const { isOpen } = useSelector((store: RootState) => store.modal); 
  

  useIngredients();
  
  return (
    <>
      <Header />
      <Main />
      {isOpen && <Modal />}
    </>
  );
}

export default App;
