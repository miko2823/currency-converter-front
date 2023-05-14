import React, { useState } from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { StyledApp } from './index.styled';
import { Login } from '../Login';
import { Converter } from '../Converter';
import { Tooltip } from '@mui/material';

function App() {
  const [token, setIsToken] = useState<string | null>('');

  return (
    <StyledApp>
      <Tooltip title="Currenct Converter" placement="right">
        <LogoDevIcon className="logo" />
      </Tooltip>
      {token ? (
        <Converter logoutCallback={() => setIsToken(null)} />
      ) : (
        <Login loginCallback={(token: string) => setIsToken(token)} />
      )}
    </StyledApp>
  );
}

export default App;
