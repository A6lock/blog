import { Alert } from 'antd';

function Error() {
  return (
    <Alert
      message="Error"
      description="An error has occurred. Try again."
      type="error"
      closable
    />
  );
}

export default Error;
