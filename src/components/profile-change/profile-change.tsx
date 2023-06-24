import cn from 'classnames';

import styles from  './profile-change.module.scss';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { CLEAR_ERROR, updateUser } from '../../services/actions/authActions';
import { RootState, useDispatch, useSelector } from '../../services';
import { ChangeEvent, useMemo, useState } from 'react';



const ProfileChange = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const defaultUserData = {email: user.email || '', name: user.name || '', password: ''};
  const [userData, setUserData] = useState(defaultUserData);

  const enableToSend = useMemo<boolean>(() => {
    return userData.name !== user.name || userData.email !== user.email || !!userData.password
  }, [userData, user]);

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();   
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    dispatch({ type: CLEAR_ERROR });
  }

  const handlerSave = () => {
    dispatch(updateUser(userData) as any);
  };

  const handlerReset = () => {
    setUserData(defaultUserData);
  };

  return (
    <div className={cn(styles.form)}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={userData.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass={cn('pb-6')}
        icon='EditIcon'
      />
      <EmailInput
        onChange={onChange}
        value={userData.email}
        name={'email'}
        placeholder='Логин'
        isIcon={true}
        extraClass={cn('pb-6')}
      />
      <PasswordInput
        onChange={onChange}
        value={'password'}
        name={'password'}
        extraClass={cn('pb-6')}
        icon='EditIcon'
      />
      <div className={cn(styles.buttons)}>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          extraClass='mb-20'
          onClick={handlerSave}
          disabled={!(enableToSend)}
        >
          Сохранить
        </Button>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          extraClass='mb-20'
          onClick={handlerReset}
          disabled={!(enableToSend)}
        >
          Отмена
        </Button>
      </div>
    </div>
  )
};


export default ProfileChange;