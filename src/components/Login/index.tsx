import React, { ChangeEvent, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { StyledLogin } from './index.styled';
import { Api, LoginResponse } from '../../api';
import { AxiosResponse } from 'axios';

type Props = {
  loginCallback: (token: string) => void;
};

function Login({ loginCallback }: Props): JSX.Element {
  const api = new Api();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loginAction = (): void => {
    api
      .login({ userName, password })
      .then(({ data }: AxiosResponse<LoginResponse>) => {
        loginCallback(data.data);
      })
      .catch((error) => alert(error.response.data.message));
  };

  return (
    <StyledLogin>
      <Typography>
        ID: <span>admin</span>, Password: <span>pass</span>
      </Typography>
      <TextField
        required
        label="id"
        variant="outlined"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
      />
      <TextField
        required
        label="Password"
        variant="outlined"
        type="password"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
      />
      <Button variant="contained" onClick={loginAction}>
        Login
      </Button>
    </StyledLogin>
  );
}

export { Login };
