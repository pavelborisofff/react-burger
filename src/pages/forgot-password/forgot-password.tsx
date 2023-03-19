import cn from 'classnames';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { CLEAR_ERROR, forgotPassword } from '../../services/actions/authActions';


const initEmail: string = '';


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState(initEmail);
  const { user, isAuth, isError, isForgot, message } = useSelector((store: RootState) => store.auth); 


  const onChange = (e:any) => {
    e.preventDefault();   
    setEmail(e.target.value);

    dispatch({ type: CLEAR_ERROR });
  }

  const onClick = (e:any) => {
    e.preventDefault();

    if (email) {
      dispatch(forgotPassword(email) as any);
    }
  };

  useEffect(() => {
    if (isForgot) {
      navigate(Pages.resetPassword);
    }
  }, [isForgot, navigate]);



  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6',  isError ? 'error' : '')}>
        {isError ? message : 'Восстановление пароля'}
      </p>
      <EmailInput
        onChange={onChange}
        value={email}
        name={'email'}
        placeholder='Укажите e-mail'
        isIcon={false}
        extraClass={cn('pb-6')}
      />
      <Button 
        htmlType='button' 
        type='primary' 
        size='medium' 
        extraClass='mb-20'
        onClick={onClick}
        disabled={!email}
      >
        Восстановить
      </Button>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Вспомнили пароль? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

function dispatch(arg0: { type: string; }) {
  throw new Error('Function not implemented.');
}
