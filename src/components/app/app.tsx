import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

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
import { ProtectedRoute } from '../protected-route/protected-route';
import Order from '../../pages/order';
import { getUser } from '../../services/actions/authActions';


function App() {
  const { isOpen } = useSelector((store: RootState) => store.modal); 
  const { isAuth } = useSelector((store: RootState) => store.auth); 
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  console.log('app isAuth', isAuth);
    
  // autologin
  useEffect(() => {
    dispatch(getUser() as any);
  }, []);
  
  useIngredients();
  
  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path={Pages.main} element={<Main />} />
        <Route path={Pages.order} element={<Order />} />
        <Route path={Pages.login} element={<ProtectedRoute forAnonymous={true}><Login /></ProtectedRoute>} />
        <Route path={Pages.register} element={<ProtectedRoute forAnonymous={true}><Register /></ProtectedRoute>} />
        <Route path={Pages.forgotPassword} element={<ProtectedRoute forAnonymous={true}><ForgotPassword /></ProtectedRoute>} />
        <Route path={Pages.resetPassword} element={<ProtectedRoute forAnonymous={true}><ResetPassword /></ProtectedRoute>} />
        <Route path={Pages.profile + '/*'} element={<ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path={Pages.ingredients + '/*'} element={<Ingredients />} />
        {background && <Route path={Pages.ingredients + '/*'} element={<Modal />} />}
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      {isOpen && <Modal />}
    </>
  );
}

export default App;
