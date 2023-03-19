import cn from 'classnames';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { useState } from 'react';
import { CLEAR_ERROR, resetPassword } from '../../services/actions/authActions';


const initPass = {
  password: '',
  token: ''
};


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ form, setForm ] = useState(initPass);
  const { user, isAuth, isError, isForgot, message } = useSelector((store: RootState) => store.auth); 

  if (!isForgot) {
    return <Navigate to={Pages.forgotPassword} replace/>;
  }

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

    if (form.token && form.password) {
      dispatch(resetPassword(form) as any);
    }
  };

  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6', isError ? 'error' : '')}>
        {isError ? message : 'Восстановление пароля'}
      </p>
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        placeholder='Введите новый пароль'
        extraClass={cn('pb-6')}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onChange}
        value={form.token}
        name={'token'}
        error={false}
        // ref={inputRef}
        // onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={cn('pb-6')}
      />
      <Button 
        htmlType='button' 
        type='primary' 
        size='medium' 
        extraClass='mb-20'
        onClick={onClick}
        disabled={!(form.token && form.password)}
      >
        Сохранить
      </Button>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
      Вспомнили пароль? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default ResetPassword;