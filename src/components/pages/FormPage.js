/*eslint-disable */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input, Checkbox, Divider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import RealWorldService from '../../services/RealWorldService';
import {
  changeToken,
  changeEmail,
  changeUsername,
  userDataFilling,
} from '../app/appSlice';

// Этот компонент в зависимости от пропсов возвращает немного разные страницы.
function FormPage({ edit, signIn, signUp }) {
  const history = useHistory();

  const token = useSelector((state) => state.appSlice.token);

  const dispatch = useDispatch();

  const { path } = useRouteMatch();

  const {
    formState: { isValid, errors },
    handleSubmit,
    control,
    watch,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  const realWorldService = new RealWorldService();

  const onSubmit = (data) => {
    // eslint-disable-next-line default-case
    switch (path.slice(1)) {
      case 'profile':
        const changeableData = {
          user: Object.assign({}, data),
        };

        realWorldService
          .registrationAccout(changeableData)
          .then(({ user }) => {
            dispatch(userDataFilling(user));

            for (let key in user) {
              localStorage.setItem(`${key}`, user[key]);
            }
          })
          .catch(({ errors }) => {
            for (let error in errors) {
              setError(error, { type: 'custom', message: errors[error] });
            }
          });

        //Переход на главную после изменений
        history.push('/articles');

        break;
      case 'sign-in':
        const loginUser = {
          user: {
            email: data.email.toLowerCase(),
            password: data.password,
          },
        };

        realWorldService.login(loginUser).then((response) => {});

        //Переход на главную после логина
        history.push('/articles');

        break;
      case 'sign-up':
        // Регистрация
        const registrationUser = {
          user: {
            username: data.username,
            email: data.email.toLowerCase(),
            password: data.password,
          },
        };

        realWorldService
          .registrationAccout(registrationUser)
          .then(({ user }) => {
            dispatch(userDataFilling(user));

            for (let key in user) {
              localStorage.setItem(`${key}`, user[key]);
            }

            //Переход на главную после того, как зарегистируемся
            history.push('/articles');
          })
          .catch(({ errors }) => {
            for (let error in errors) {
              setError(error, { type: 'custom', message: errors[error] });
            }
          });
        break;
    }
  };

  // Отслеживаю пароль, если у меня регистрация или изменение
  const watchPassword = edit || signUp ? watch('password') : null;

  // Отслеживаю чекбокс, если у меня регистрация
  const watchCheckbox = signUp ? watch('Approval') : null;

  // Валидация мейла
  const mailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="form__wrapper">
      <h1 className="form__tittle">
        {signUp ? 'Create new account' : signIn ? 'Sign in' : 'Edit Profile'}
      </h1>
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        {/* Если регистрация или изменение - вывожу инпут Username */}
        {signUp || edit ? (
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
                    {error && (
                      <div style={{ color: 'red' }}>{error.message}</div>
                    )}
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
                  message:
                    'The user name must consist of at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'The user name must not exceed 20 characters',
                },
              }}
            />
          </label>
        ) : null}
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
          <span className="form__name">
            {/* Во всех случаях, кроме edit - Password  */}
            {edit ? 'New password' : 'Password'}
          </span>
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
        {/* Повтор пароля только пир регистрации */}
        {signUp ? (
          <label className="form__element">
            <span className="form__name">Repeat Password</span>
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
                    {error && (
                      <div style={{ color: 'red' }}>{error.message}</div>
                    )}
                  </>
                );
              }}
              name="repeatPassword"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password must match',
                validate: (value) => {
                  return value === watchPassword ? true : 'Password must match';
                },
              }}
            />
          </label>
        ) : null}
        {/* Аватар можно указать только при изменении профиля */}
        {edit ? (
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
                    {error && (
                      <div style={{ color: 'red' }}>{error.message}</div>
                    )}
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
        ) : null}
        {/* Чекбоес и дивайдер только при регистрации */}
        {signUp ? (
          <>
            <Divider />
            <label className="form__element checkbox">
              <Controller
                render={({ field: { onChange, value, ref } }) => {
                  return (
                    <Checkbox
                      onChange={(e) => {
                        onChange(e.target.checked);
                      }}
                      checked={value}
                      inputRef={ref}
                    >
                      I agree to the processing of my personal informatio
                    </Checkbox>
                  );
                }}
                control={control}
                name="Approval"
                defaultValue
              />
            </label>
          </>
        ) : null}
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBottom: '7px' }}
          disabled={!isValid && !watchCheckbox}
        >
          {/* Надпись кнопки меняется в зависимости от вида формы */}
          {signUp ? 'Create' : signIn ? 'Login' : 'Save'}
        </Button>
        {/* Ссылка под кнопкой меняется в зависимости от вида формы */}
      </form>
      {signUp ? (
        <span className="under-button-text">
          Already have an account?{' '}
          <Link to="/sign-in" style={{ color: '#1890FF', paddingLeft: '4px' }}>
            Sign In
          </Link>
          .
        </span>
      ) : signIn ? (
        <span className="under-button-text">
          Don’t have an account?{' '}
          <Link to="/sign-up" style={{ color: '#1890FF', paddingLeft: '4px' }}>
            Sign Up
          </Link>
          .
        </span>
      ) : null}
    </div>
  );
}

export default FormPage;
