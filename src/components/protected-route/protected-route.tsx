import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { Navigate, useLocation } from 'react-router-dom';
import { Pages } from '../../utils/constants';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/authActions';
import { getCookie } from '../../utils/cookie';


interface IProtectedRoute {
  children: JSX.Element,
  forAnonymous?: boolean,
  redirectPath?: Pages,
}


// const notForAuth = [
//   Pages.login as string,
//   Pages.register as string,
//   Pages.forgotPassword as string,
//   Pages.resetPassword as string,
// ]


const ProtectedRoute = ({ children, forAnonymous = false }:IProtectedRoute) => {
  const location = useLocation();
  
  const { isAuth } = useSelector((store: RootState) => store.auth);
  const from = location.state?.from || '/';
  console.log('from', from);
  

  if (forAnonymous && isAuth) {
    return <Navigate to={from} />;
  } 

  if (!forAnonymous && !isAuth) {
    return <Navigate to={Pages.login} state={{ from: location }}/>;
  }

  return children;
}

export { ProtectedRoute };