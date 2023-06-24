import { useState, ChangeEvent, FormEvent } from 'react';
import { CLEAR_ERROR } from '../services/actions/authActions';
import { useDispatch } from '../services';

interface IInputValues {
  [key: string]: string;
}

interface IUseFormReturnType {
  values: IInputValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: IInputValues) => void;
  handleSubmit: (callback: () => void) => (event: FormEvent<HTMLFormElement>) => void;
}

export function useForm(inputValues: IInputValues): IUseFormReturnType  {
  const dispatch = useDispatch();
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    dispatch({ type: CLEAR_ERROR });
  };

  const handleSubmit = (callback: () => void) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    callback();
  };

  return { values, handleChange, setValues, handleSubmit };
}