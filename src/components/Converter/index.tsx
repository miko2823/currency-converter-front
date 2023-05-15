import React, { useEffect, useState } from 'react';
import { StyledConverter } from './index.styled';
import { Api, GetAllSymbolsResponse, SymbolResponse, ConvertResponse, Rate } from '../../api';
import { Button, List, ListItem, ListItemText, Tooltip,
  Typography, FormControl, TextField, InputLabel, MenuItem,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { AxiosResponse } from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';


type Props = {
  logoutCallback: () => void;
};

function Converter({ logoutCallback }: Props): JSX.Element {
  const api = new Api();
  const [selectedSymbol, setSelectedSymbol] = useState<string | 'JPY'>('');
  const [symbols, setSymbols] = useState<SymbolResponse[] | null>(null);

  const [baseSymbol, setBaseSymbol] = useState<string | ''>('');
  const [selectedAmount, setSelectedAmount] = useState<number | 0>(0);
  const [convertResult, setConvertResult] = useState<Rate[] | null>(null);

  const myDefaultCurrencyList = ['JPY', 'USD', 'MYR', 'THB', 'AUD'];
  const [myCurrencyList, setMyCurrencyList] = useState<string[]>(myDefaultCurrencyList);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (currency_code: string) => {
    setBaseSymbol(currency_code);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convert = (): void => {
    const symbolsString: string = myCurrencyList.join();
    api
      .convert({base: baseSymbol, symbols:symbolsString, amount: selectedAmount})
      .then(({ data }: AxiosResponse<ConvertResponse>) => {
        setConvertResult(data.data.rates);
      })
      .catch((error) => alert("API利用を制限中です"));
  }

  useEffect(() => {
    api
      .getAllSymbols()
      .then(({ data }: AxiosResponse<GetAllSymbolsResponse>) => {
        setSymbols(data.data);
      })
      .catch((error) => alert("API利用を制限中です"));
  }, [api]);

  const logoutAction = (): void => {
    localStorage.removeItem('token');
    logoutCallback();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSymbol(event.target.value);
    appendMyCurrencyList(event.target.value);
  };

  const appendMyCurrencyList = (currency: string) => {
    if (myCurrencyList.includes(currency)) {
      return;
    }
    setMyCurrencyList(myCurrencyList => [...myCurrencyList, currency])
  };

  const deleteCurrencyFromMyCurrencyList = (currency: string) => {
    setMyCurrencyList((myCurrencyList.filter(item => item !== currency)))
  };

  const handleConvertCurrenct = () => {
    convert();
    handleClose();
    setSelectedAmount(0);
  }

  const getConvertedValue = (currency_code: string) => {
    if (!convertResult) {
      return null;
    }
    const matchItem = convertResult.find((item: Rate) => item.currency === currency_code);
    return matchItem ? matchItem.rate : null;
  }

  return (
    <StyledConverter>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Enter the Amount</DialogTitle>
        <DialogContent>
          <TextField
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(parseFloat(e.target.value))}
            autoFocus
            margin="dense"
            id="name"
            label="Amount to convert"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConvertCurrenct}>OK</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Currency Converter
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Add Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSymbol}
          label="Age"
          onChange={handleChange}
        >
          {symbols && symbols.map((symbol: SymbolResponse) => {
            return <MenuItem key={symbol.currency_code} value={symbol.currency_code}>
              {symbol.currency_code}({symbol.currency})
            </MenuItem>
          })}

        </Select>
      </FormControl>
      <nav aria-label="currency-list">
        <List>
          {myCurrencyList.map((currency_code: string) => {
            return (
              <ListItem
                key={currency_code}
                secondaryAction={
                  <IconButton
                     edge="end"
                     aria-label="delete"
                     onClick={() => deleteCurrencyFromMyCurrencyList(currency_code)}>
                    <DeleteIcon />
                  </IconButton>
                }
                >
                <ListItemText>{currency_code}</ListItemText>
                <TextField
                  key={currency_code}
                  variant="outlined"
                  type="number"
                  onClick={() => handleClickOpen(currency_code)}
                  value={() => getConvertedValue(currency_code)}
                />
              </ListItem>
            );
          })}
        </List>
      </nav>
      <Tooltip title="Logout" placement="right">
        <Button onClick={logoutAction}>
          <LogoutIcon />
        </Button>
      </Tooltip>
    </StyledConverter>
  );
}

export { Converter };
