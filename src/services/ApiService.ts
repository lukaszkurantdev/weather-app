import axios, {AxiosRequestConfig as AxiosRequestConfigFromAxios} from 'axios';
import ApiConfig from '../configs/ApiConfig';

export interface AxiosRequestConfig extends AxiosRequestConfigFromAxios {}

export const Points = {
  weather: 'weather',
  onecall: 'onecall',
};

export const request = axios.create({
  baseURL: ApiConfig.apiLink,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.params = {...config.params, appid: ApiConfig.apiKey};
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
