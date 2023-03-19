import cn from 'classnames';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { useEffect, useState } from 'react';
import { CLEAR_ERROR, IRegisterForm, login, register } from '../../services/actions/authActions';


import styles from './register.module.scss';
import { getCookie } from '../../utils/cookie';

const initLogin:IRegisterForm = {
  name: '',
  email: '',
  password: '',
}


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth, isError, message } = useSelector((store: RootState) => store.auth); 
  const [ form, setForm ] = useState(initLogin);


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

    if (form.email && form.password && form.name) {
      if (dispatch(register(form) as any)) {
        dispatch(login({email: form.email, password: form.password}) as any)
      }
    }  
  };

  useEffect(() => {
    if (isAuth || user.name) {
      navigate(Pages.profile, { replace: true });
    }
  }, [isAuth, user, navigate])

  return (
    <div className={cn('center-wrapper')}>
      <p className={cn('text text_type_main-medium center pb-6', isError ? 'error' : '')}>
        {isError ? message : 'Регистрация'}
      </p>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={form.name}
        name={'name'}
        // error={isError}
        // errorText={message}
        // ref={inputRef}
        // onIconClick={onIconClick}
        size={'default'}
        extraClass={cn('pb-6')}
      />
      <EmailInput
        onChange={onChange}
        value={form.email}
        name={'email'}
        placeholder='Логин'
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
        disabled={!(form.email && form.password && form.name)}
      >
        Зарегистрироваться
      </Button>
      <p className={cn('text text_type_main-default text_color_inactive pb-4')}>
        Уже зарегистрированные? <Link className={cn('link')} to={Pages.login}>Войти</Link>
      </p>
    </div>
  );
};

export default Register;