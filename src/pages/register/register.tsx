import cn from 'classnames';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { useEffect, useMemo, useState } from 'react';
import { CLEAR_ERROR, IRegisterForm, login, register } from '../../services/actions/authActions';


import styles from './register.module.scss';
import { getCookie } from '../../utils/cookie';
import { useForm } from '../../hooks/useForm';


const initLogin = {
  name: '',
  email: '',
  password: '',
}


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth, isError, message } = useSelector((store: RootState) => store.auth); 
  const { values, handleChange, handleSubmit } = useForm(initLogin);
  const isFormValid = useMemo(() => !(values.email && values.password && values.name), [values.email, values.password, values.name]);


  const onSubmit = () => {
    dispatch(register(values as unknown as IRegisterForm) as any)
  };

  useEffect(() => {
    if (isAuth || user.name) {
      navigate(-1);
      // navigate(Pages.profile, { replace: true });
    }
  }, [isAuth, user, navigate])

  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6', isError ? 'error' : '')}>
        {isError ? message : 'Регистрация'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          size={'default'}
          extraClass={cn('pb-6')}
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder='Логин'
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Уже зарегистрированные? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default Register;