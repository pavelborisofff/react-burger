import cn from 'classnames';

import styles from  './profile.module.scss';

import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Pages } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR, logout, updateUser } from '../../services/actions/authActions';
import { RootState } from '../../services';
import { useMemo, useState } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  const defaultUserData = {email: user.email, name: user.name, password: ''};
  const [userData, setUserData] = useState(defaultUserData);

  const enableToSend = useMemo(() => {
    return userData.name !== user.name || userData.email !== user.email || !!userData.password
  }, [userData]);

  const onChange = (e:any) => {
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

  const onClick = () => {
    dispatch(logout() as any);
  };

  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.profileList)}>
        <ul>
          <li>
            <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6', styles.active)}>Профиль</p>
          </li>
          <li>
            <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6')}>История заказов</p>
          </li>
          <li onClick={onClick}>
            <p className={cn(styles.profileItem, 'text text_type_main-large', 'pb-6')}>Выход</p>
          </li>
        </ul>
        <p className={cn(styles.profileItem, 'text text_type_main-default', 'pt-20')}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div  className={cn(styles.form)}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={userData.name}
          name={'name'}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
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
    </div>
  );
};

export default Profile;