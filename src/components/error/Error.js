import { Alert } from 'antd';

function Error() {
  const onClose = () => {
    window.location.reload();
  };
  return (
    <Alert
      message="Error"
      description="An error has occurred. Try again."
      type="error"
      onClose={onClose}
    />
  );
}

export default Error;
