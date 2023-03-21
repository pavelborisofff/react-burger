import cn from 'classnames';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { ILoginForm, login } from '../../services/actions/authActions';
import { Link, useNavigate,  } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';


const initLogin = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm(initLogin);
  const { isAuth, isError, message } = useSelector((store: RootState) => store.auth); 
  const isFormValid = useMemo(() => !(values.email && values.password), [values.email, values.password]);

  const onSubmit = () => {
    dispatch(login(values as any) as any);
  };

  useEffect(() => {
    if (isAuth) {
      console.log('login isAuth', isAuth);
      
      navigate(-1);
    }
  }, [isAuth, navigate])


  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6',  isError ? 'error' : '')}>
        {isError ? message : 'Вход'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder='E-mail'
          isIcon={false}
          extraClass={cn('pb-6')}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass={cn('pb-6')}
        />
        <Button 
          htmlType='submit' 
          type='primary' 
          size='medium' 
          extraClass='mb-20' 
          disabled={isFormValid}
        >
          Войти
        </Button>
      </form>
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