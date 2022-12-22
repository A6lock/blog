/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, Controller } from 'react-hook-form';
import './SignInPage.scss';
import { Input, Button } from 'antd';

function EditProfilePage() {
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
  // Сделать проверку на совпадение с прошлым паролем
  // eslint-disable-next-line no-unused-vars
  const watchPassword = watch('Password');

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
                  />
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
            name="Username"
            control={control}
            // Добавить
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
            // Добавить
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
            defaultValue=""
            rules={{
              required: 'URL must match',
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
          disabled={!isValid}
        >
          Create
        </Button>
        {/* <button className='form__button' type="submit" disabled={!isValid}>Create</button> */}
      </form>
    </div>
  );
}

export default EditProfilePage;
