import { Box, styled } from '@mui/material';

export const StyledConverter = styled(Box)`
  max-width: 600px;
  padding: 0.5rem;
  margin: auto;

  h2 {
    font-size: 1.5rem;
  }

  .MuiListItemButton-root {
    background-color: #ffa559;
    text-align: center;
    border-radius: 0.25rem;

    &:hover {
      background-color: #ffa559;
    }
  }

  .MuiList-root {
    background-color: #ffe6c7;
  }

  .MuiBox-root {
    background-color: #ffe6c7;
  }

  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;
