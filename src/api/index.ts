import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6001/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

type LoginRequest = {
  userName: string;
  password: string;
};

type ConvertRequest = {
  base: string;
  symbols: string;
  amount: number;
};

export type LoginResponse = {
  error: boolean;
  message: string;
  data: string
};

export type ConvertResponse = {
  error: boolean;
  message: string;
  data: ConvertResponseBase
};

export type ConvertResponseBase = {
  base: string
  amount: number
  rates: Rate[]
};

export type Rate = {
  currency: string
  rate: number
};

export type GetAllSymbolsResponse = {
  error: boolean;
  message: string;
  data: SymbolResponse[]
};

export type SymbolResponse = {
  currency_code: string
  currency: string

}

interface ApiProtocol {
  login: (request: LoginRequest) => Promise<AxiosResponse<LoginResponse>>;
  getAllSymbols: () => Promise<AxiosResponse<GetAllSymbolsResponse>>;
  convert: (request: ConvertRequest) => Promise<AxiosResponse<ConvertResponse>>;
}

class Api implements ApiProtocol {
  login(request: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return api.post('login', request);
  }

  convert(params: ConvertRequest): Promise<AxiosResponse<ConvertResponse>> {
    return api.get('converter/', {params: params});
  }

  getAllSymbols(): Promise<AxiosResponse<GetAllSymbolsResponse>> {
    return api.get('converter/get_all_symbols');
  }
}

export { Api };
