import React, {
  FC,
} from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { Alert, Button } from 'react-bootstrap';
import { IModalError } from '../../interfaces';

const ErrorWindow: FC<IModalError> = ({ message, handleModal }): JSX.Element => (
  <Alert variant="danger" style={{ margin: '0' }}>
    <Alert.Heading>Attention!</Alert.Heading>
    <p>
      {message}
    </p>
    <hr />
    <div className="d-flex justify-content-end">
      <Button onClick={handleModal} variant="outline-success">
        Retry!
      </Button>
    </div>
  </Alert>
);

const getErrorText = (error: AxiosError): string => {
  let result = '';
  if (error.code === 'ERR_NETWORK') {
    result = 'Internal error. Try again later.';
  } else {
    const errResponse = error.response as AxiosResponse;
    result = errResponse.data.error;
  }
  return result;
};

export { ErrorWindow, getErrorText };
