import { RootState, useSelector } from '../../services';
import { Navigate, useLocation } from 'react-router-dom';
import { Pages } from '../../utils/constants';


interface IProtectedRoute {
  children: JSX.Element,
  forAnonymous?: boolean,
  redirectPath?: Pages,
}

const ProtectedRoute = ({ children, forAnonymous = false }:IProtectedRoute) => {
  const location = useLocation();
  
  const { isAuth } = useSelector((store: RootState) => store.auth);
  const from = location.state?.from || '/';  

  if (forAnonymous && isAuth) {
    return <Navigate to={from} />;
  } 

  if (!forAnonymous && !isAuth) {
    return <Navigate to={Pages.login} state={{ from: location }}/>;
  }

  return children;
}

export { ProtectedRoute };