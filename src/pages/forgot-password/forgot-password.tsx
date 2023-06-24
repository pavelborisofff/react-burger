import cn from 'classnames';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services';
import { forgotPassword } from '../../services/actions/authActions';
import { useForm } from '../../hooks/useForm';


const initEmail = {
  email: '',
}


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm(initEmail);
  const { isError, isForgot, message } = useSelector((store: RootState) => store.auth); 

  const onSubmit = () => {
    dispatch(forgotPassword(values.email));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder='Укажите e-mail'
          isIcon={false}
          extraClass={cn('pb-6')}
        />
        <Button 
          htmlType='submit' 
          type='primary' 
          size='medium' 
          extraClass='mb-20'
          disabled={!values.email}
        >
          Восстановить
        </Button>
      </form>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Вспомнили пароль? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
