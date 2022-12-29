/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import RealWorldService from '../../services/RealWorldService';
import { userDataFilling } from '../app/appSlice';

import './formPage.scss';

// Этот компонент в зависимости от пропсов возвращает немного разные страницы.
function ProfilePage() {
  const token = useSelector((state) => state.appSlice.token);

  const history = useHistory();

  const dispatch = useDispatch();

  const {
    formState: { isValid },
    handleSubmit,
    control,
    watch,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const realWorldService = new RealWorldService();

  const onSubmit = (data) => {
    const changeableData = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.image,
      },
    };
    localStorage.setItem('image', data.image);

    realWorldService
      .updateUser(changeableData, token)
      .then(({ user }) => {
        dispatch(userDataFilling(user));

        for (const key in user) {
          localStorage.setItem(`${key}`, user[key]);
        }

        // Переход на главную после изменений
        history.push('/articles');
      })
      .catch(({ errors }) => {
        for (const error in errors) {
          setError(error, { type: 'custom', message: errors[error] });
        }
      });
  };

  // Отслеживаю чекбокс, если у меня регистрация
  const watchCheckbox = watch('approval');

  // Валидация мейла
  const mailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="form__wrapper">
      <h1 className="form__tittle">Edit Profile</h1>
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <label className="form__element">
          <span className="form__name">Username</span>
          <Controller
            render={({ field, fieldState: { error } }) => {
              const inputStyle = error ? { border: '1px solid red' } : null;
              return (
                <>
                  <Input
                    {...field}
                    placeholder={field.name}
                    style={inputStyle}
                    autoComplete="on"
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="username"
            control={control}
            defaultValue={localStorage.getItem('username')}
            rules={{
              required: 'Username is required!',
              minLength: {
                value: 3,
                message: 'The user name must consist of at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'The user name must not exceed 20 characters',
              },
            }}
          />
        </label>
        <label className="form__element">
          <span className="form__name">Email address</span>
          <Controller
            render={({ field, fieldState: { error } }) => {
              const inputStyle = error ? { border: '1px solid red' } : null;
              return (
                <>
                  <Input
                    {...field}
                    placeholder={field.name}
                    style={inputStyle}
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="email"
            control={control}
            defaultValue={localStorage.getItem('email')}
            rules={{
              required: 'Email is required!',
              pattern: {
                value: mailValidate,
                message: 'Enter an existing mailing address!',
              },
            }}
          />
        </label>
        <label className="form__element">
          <span className="form__name">New password</span>
          <Controller
            render={({ field, fieldState: { error } }) => {
              const inputStyle = error ? { border: '1px solid red' } : null;
              return (
                <>
                  <Input.Password
                    {...field}
                    placeholder={field.name}
                    style={inputStyle}
                    autoComplete="on"
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password must be between 6 and 40 characters!',
              minLength: {
                value: 6,
                message: 'Password must be more than 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Password must be less than 40 characters.',
              },
            }}
          />
        </label>
        <label className="form__element">
          <span className="form__name">Avatar image (url)</span>
          <Controller
            render={({ field, fieldState: { error } }) => {
              const inputStyle = error ? { border: '1px solid red' } : null;
              return (
                <>
                  <Input
                    {...field}
                    placeholder={field.name}
                    style={inputStyle}
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="image"
            control={control}
            defaultValue={localStorage.getItem('image') || null}
            rules={{
              pattern: {
                value:
                  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                message: 'Enter a valid URL',
              },
            }}
          />
        </label>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBottom: '7px' }}
          disabled={!isValid && !watchCheckbox}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default ProfilePage;
