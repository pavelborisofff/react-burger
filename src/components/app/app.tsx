import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useIngredients from '../../hooks/api';
import Header from "../header/header";

import Main from '../../pages/main';
import { Modal } from '../modal/modal';


import "./app.module.scss";

import { RootState } from '../../services';
import { Pages } from '../../utils/constants';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Ingredients from '../../pages/ingredients';

function App() {
  const { isOpen } = useSelector((store: RootState) => store.modal); 
  

  useIngredients();
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={Pages.main} element={<Main />} />
        <Route path={Pages.login} element={<Login />} />
        <Route path={Pages.register} element={<Register />} />
        <Route path={Pages.forgotPassword} element={<ForgotPassword />} />
        <Route path={Pages.resetPassword} element={<ResetPassword />} />
        <Route path={Pages.profile} element={<Profile />} />
        <Route path={Pages.ingredients} element={<Ingredients />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      {isOpen && <Modal />}
    </Router>
  );
}

export default App;
