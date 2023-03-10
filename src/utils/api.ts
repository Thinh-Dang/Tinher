import axios, { AxiosRequestConfig } from 'axios';
import { IResponse } from '../@type/responses';
import { getItemLocalStorage } from './storage';

const http = axios.create({
  headers: {
    'Content-type': `application/json;charset=UTF-8`,
  },
});

http.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const { url } = config;
    config.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

    if (config.headers === undefined) {
      config.headers = {};
    } else if (url?.includes(`secure`)) {
      const token: string | undefined = getItemLocalStorage(`token`);
      config.headers.Authorization = token ? `Bearer ${token}` : ``;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return {
      status: false,
      error: error,
      data: null,
      message: null,
    } as IResponse<any>;
  },
);

http.interceptors.response.use(
  function (response) {
    return response.data as IResponse<any>;
  },

  function (error) {
    return {
      status: false,
      error_code: error,
      data: null,
      message: null,
    } as IResponse<any>;
  },
);

const axiosApiCall = async <T = any>(
  url: string,
  method: string,
  body = {},
  isFormData?: boolean,
): Promise<IResponse<any>> => {
  if (isFormData) {
    return http.request<T, IResponse<any>>({
      method,
      url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      data: body,
      headers: {
        'Content-type': ` multipart/form-data`,
      },
    });
  }
  return http.request<T, IResponse<any>>({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    data: body,
  });
};

export default axiosApiCall;
