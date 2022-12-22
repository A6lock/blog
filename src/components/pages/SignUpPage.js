/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './SignInPage.scss';
import { Input, Checkbox, Divider, Button } from 'antd';

function SignUpPage() {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = () => {
    reset();
  };

  const watchPassword = watch('Password');
  const watchCheckbox = watch('Approval');

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
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="Username"
            control={control}
            defaultValue=""
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
            name="Email"
            control={control}
            defaultValue=""
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
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="Password"
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
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="RepeatPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password must match',
              validate: (value) => {
                return value === watchPassword ? true : 'Password must match';
              },
            }}
          />
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
            {/* <input type="checkbox" />
            <span>I agree to the processing of my personal information</span> */}
          </label>
        </label>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%', marginBottom: '7px' }}
          disabled={!isValid || !watchCheckbox}
        >
          Create
        </Button>
        {/* <button className='form__button' type="submit" disabled={!isValid}>Create</button> */}
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
