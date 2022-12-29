/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Input, Checkbox, Divider, Button } from 'antd';
import { useDispatch } from 'react-redux';

import RealWorldService from '../../services/RealWorldService';
import { userDataFilling } from '../app/appSlice';

import './formPage.scss';

// Этот компонент в зависимости от пропсов возвращает немного разные страницы.
function SignUpPage() {
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

        for (const key in user) {
          localStorage.setItem(`${key}`, user[key]);
        }

        // Переход на главную после того, как зарегистируемся
        history.push('/articles');
      })
      .catch(({ errors }) => {
        for (const error in errors) {
          setError(error, { type: 'custom', message: errors[error] });
        }
      });
  };

  // Отслеживаю пароль
  const watchPassword = watch('password');

  // Отслеживаю чекбокс
  const watchCheckbox = watch('approval');

  // Валидация мейла
  const mailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="form__wrapper">
      <h1 className="form__tittle">Create new account</h1>
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
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
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
            rules={{
              required: true,
            }}
            control={control}
            name="approval"
            defaultValue="true"
          />
        </label>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBottom: '7px' }}
          disabled={!isValid && !watchCheckbox}
        >
          Create
        </Button>
        {/* Ссылка под кнопкой меняется в зависимости от вида формы */}
      </form>
      <span className="under-button-text">
        Already have an account?{' '}
        <Link to="/sign-in" style={{ color: '#1890FF', paddingLeft: '4px' }}>
          Sign In
        </Link>
        .
      </span>
    </div>
  );
}

export default SignUpPage;
