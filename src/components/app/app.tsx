import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { useIngredients } from '../../hooks/api';
import Header from "../header/header";

import Main from '../../pages/main';
import { Modal } from '../modal/modal';


import "./app.module.scss";

import { Pages } from '../../utils/constants';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import Ingredients from '../../pages/ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUser } from '../../services/actions/authActions';
import Feed from '../../pages/feed';
import Orders from '../../pages/orders';
import { useDispatch } from '../../services';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  // autologin
  useEffect(() => {
    dispatch(getUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIngredients();
  
  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path={Pages.main} element={<Main />} />
        <Route path={Pages.feed} element={<Feed />}>
          <Route path={Pages.feedId} element={<Orders />} />
        </Route>
        {/* <Route path={Pages.ordersId} element={<Orders />} /> */}
        <Route path={Pages.login} element={<ProtectedRoute forAnonymous={true}><Login /></ProtectedRoute>} />
        <Route path={Pages.register} element={<ProtectedRoute forAnonymous={true}><Register /></ProtectedRoute>} />
        <Route path={Pages.forgotPassword} element={<ProtectedRoute forAnonymous={true}><ForgotPassword /></ProtectedRoute>} />
        <Route path={Pages.resetPassword} element={<ProtectedRoute forAnonymous={true}><ResetPassword /></ProtectedRoute>} />
        <Route path={Pages.profile} element={<ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path={Pages.orders} element={<ProtectedRoute><Profile /></ProtectedRoute> }>
          <Route path={Pages.ordersId} element={<ProtectedRoute><Orders /></ProtectedRoute> } />
        </Route>
        {/* <Route path={Pages.ordersId} element={<ProtectedRoute><OrderCard /></ProtectedRoute> } /> */}
        <Route path={Pages.ingredients} element={<Ingredients />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      {background && 
        <Routes>
          <Route 
            path={Pages.ingredients} 
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <Ingredients />
              </Modal>
            } 
          />
          <Route 
            path={Pages.ordersId} 
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <Orders />
              </Modal>
            } 
          />
          <Route 
            path={Pages.feedId} 
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <Orders />
              </Modal>
            } 
          />
        </Routes>
      }
    </>
  );
}

export default App;
