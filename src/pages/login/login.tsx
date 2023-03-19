import cn from 'classnames';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { CLEAR_ERROR, ILoginForm, login } from '../../services/actions/authActions';
import { AnyAction } from 'redux';
import { Link, useLocation, useNavigate,  } from 'react-router-dom';


const initLogin:ILoginForm = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ form, setForm ] = useState(initLogin);
  const { user, isAuth, isError, message } = useSelector((store: RootState) => store.auth); 
  

  const onChange = (e:any) => {
    e.preventDefault();   
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    dispatch({ type: CLEAR_ERROR });
  }

  const onClick = (e:any) => {
    e.preventDefault();

    if (form.email && form.password) {
      dispatch(login(form) as any);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(Pages.profile, { replace: true });
    }
  }, [isAuth, navigate])


  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6',  isError ? 'error' : '')}>
        {isError ? message : 'Вход'}
      </p>
      <EmailInput
        onChange={onChange}
        value={form.email}
        name={'email'}
        placeholder='E-mail'
        isIcon={false}
        extraClass={cn('pb-6')}
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass={cn('pb-6')}
      />
      <Button 
        htmlType='button' 
        type='primary' 
        size='medium' 
        extraClass='mb-20' 
        onClick={onClick}
        disabled={!(form.email && form.password)}
      >
        Войти
      </Button>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Вы — новый пользователь? <Link className={cn('link')} to={Pages.register}>Зарегистрироваться</Link>
      </p>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Забыли пароль? <Link className={cn('link')} to={Pages.forgotPassword}>Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default Login;