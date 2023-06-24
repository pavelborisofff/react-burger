import cn from 'classnames';

import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, Navigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services';
import { useMemo } from 'react';
import { IResetForm, resetPassword } from '../../services/actions/authActions';
import { useForm } from '../../hooks/useForm';


const initPass = {
  password: '',
  token: ''
};


const ResetPassword = () => {
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit } = useForm(initPass);
  const { isError, isForgot, message } = useSelector((store: RootState) => store.auth); 
  const isFormValid = useMemo(() => !(values.password && values.token), [values.token, values.password]);

  if (!isForgot) {
    return <Navigate to={Pages.forgotPassword} replace/>;
  }

  const onSubmit = () => {
    dispatch(resetPassword(values as unknown as IResetForm));
  };

  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6', isError ? 'error' : '')}>
        {isError ? message : 'Восстановление пароля'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>

        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          placeholder='Введите новый пароль'
          extraClass={cn('pb-6')}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass={cn('pb-6')}
        />
        <Button 
          htmlType='submit' 
          type='primary' 
          size='medium' 
          extraClass='mb-20'
          disabled={isFormValid}
        >
          Сохранить
        </Button>
      </form>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
      Вспомнили пароль? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default ResetPassword;