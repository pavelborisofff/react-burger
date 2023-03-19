import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { Navigate, useLocation } from 'react-router-dom';
import { Pages } from '../../utils/constants';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/authActions';
import { getCookie } from '../../utils/cookie';


interface IProtectedRoute {
  redirectPath?: Pages,
  children: JSX.Element,
}


const notForAuth = [
  Pages.login as string,
  Pages.register as string,
  Pages.forgotPassword as string,
  Pages.resetPassword as string,
]


const ProtectedRoute = ({ children }:IProtectedRoute) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuth } = useSelector((store: RootState) => store.auth);
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  useEffect(() => {
    if (!isAuth && (!accessToken || !refreshToken)) {
      dispatch(getUser() as any );
    } 
  }, [accessToken, dispatch, isAuth, location, refreshToken])

  if (isAuth && notForAuth.includes(location.pathname)) {
    return <Navigate to={Pages.main} replace/>;
  } else if (!isAuth && !notForAuth.includes(location.pathname)) {
    return <Navigate to={Pages.login} replace/>;
  // } else if (!auth && notForAuth.includes(path)) {
  //   return children;
  } else {
    return children;
  }
}

export { ProtectedRoute };