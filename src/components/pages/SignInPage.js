/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import RealWorldService from '../../services/RealWorldService';
import { userDataFilling } from '../../store/appSlice';

import './formPage.scss';

// Этот компонент в зависимости от пропсов возвращает немного разные страницы.
function SignInPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const {
    formState: { isValid },
    handleSubmit,
    control,
    setError,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  const realWorldService = new RealWorldService();

  // Функция серверной валидации логина для react hook form
  const serverLoginValidation = useCallback((...keys) => {
    [...keys].forEach((key) => {
      setError(key, {
        type: 'custom',
        message: 'Email or password is invalid',
      });
      setValue(key, null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    const loginUser = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    };

    realWorldService
      .login(loginUser)
      .then(({ user }) => {
        dispatch(userDataFilling(user));

        for (const key in user) {
          localStorage.setItem(`${key}`, user[key]);
        }

        // Переход на главную после того, как зарегистируемся
        history.push('/articles');
      })
      .catch(() => {
        serverLoginValidation('password', 'email');
      });
  };

  // Валидация мейла
  const mailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="form__wrapper">
      <h1 className="form__tittle">Sign in</h1>
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
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
          <span className="form__name">Password</span>
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
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBottom: '7px' }}
          disabled={!isValid}
        >
          Login
        </Button>
      </form>
      <span className="under-button-text">
        Don’t have an account?{' '}
        <Link to="/sign-up" style={{ color: '#1890FF', paddingLeft: '4px' }}>
          Sign Up
        </Link>
        .
      </span>
    </div>
  );
}

export default SignInPage;
