import { Method } from '@/common/enums/enum';
import axiosApiCall from '@/utils/api';

const userApi = {
  login: async (requestOption: IFormLoginPage) => {
    const url = '/auth/login';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  register: async (requestOption: IFormRegisterPage) => {
    const url = '/auth/register';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  getOtp: async (requestOption: IFormEnterPhonePage) => {
    const url = '/otp/get-otp';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  checkOtp: async (requestOption: IFormOtpPage) => {
    const url = '/otp/verify-otp';
    return await axiosApiCall(url, Method.post, requestOption);
  },
  loginSocial: async (requestOption: ILoginWithSocialPage) => {
    const url = '/auth/login-social';
    return await axiosApiCall(url, Method.post, requestOption);
  },
};

export default userApi;
