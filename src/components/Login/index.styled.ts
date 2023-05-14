import { Box, styled } from '@mui/material';

export const StyledLogin = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 600px;
  padding: 0.5rem;
  gap: 1rem;

  .MuiTypography-root {
    text-align: left;

    span {
      color: #ff6000;
    }
  }
`;
