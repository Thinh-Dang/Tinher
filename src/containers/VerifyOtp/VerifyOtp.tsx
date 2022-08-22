import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import Content from '@/components/Content/Content';
import MyInput from '@/components/MyInput/MyInput';
import { OTPValidationSchema } from '@/Validation/Validations';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useFormik } from 'formik';
import Image from 'next/image';
import styleScss from './VerifyOtp.module.scss';
import imgOtpPage from '../../../public/assets/images/img-otp.svg';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  callAPIVerifyCode,
  callAPIVerifyCodeLoginWithSocial,
} from '@/redux/slice/userSlice';
import { Session } from 'next-auth';
import { IResponse } from '@/@type/responses';
import { useRouter } from 'next/router';

type Props = {
  data?: Session;
};

const VerifyOtp = ({ data }: Props) => {
  const router = useRouter();

  const myState = useAppSelector((state: RootState) => state.userSlice);

  const dispatch = useAppDispatch();

  const [otp, setOTP] = useState<string>();

  const [errOTP, setErrOTP] = useState<string>('');

  const handleLogiWithPhone = (value: IFormOtpPage) => {
    dispatch(callAPIVerifyCode(value));
  };

  const handleLogiWithSocial = async (value: IFormOtpPage, email: string) => {
    value.email = email;

    const result: IResponse<string> = (
      await dispatch(callAPIVerifyCodeLoginWithSocial(value))
    ).payload;
    if (result.status) {
      router.push('/finding');
    }
  };

  const handleChangeOtp = (value: string) => {
    setOTP(value);
  };
  useEffect(() => {
    if (otp?.length === 6) {
      setErrOTP('');
    }
  }, [otp]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (otp?.length != 6) {
            setErrOTP('Vui Lòng Nhập OTP đã được gửi');
          } else {
            const valuesRequest: IFormOtpPage = {
              phone: myState.phone,
              code: otp,
            };
            data
              ? handleLogiWithSocial(valuesRequest, data.user?.email as string)
              : handleLogiWithPhone(valuesRequest);
          }
        }}
        className={styleScss.verifyOtp}
      >
        <Image src={imgOtpPage} alt="Zodinet" />
        <Content
          classContent={styleScss.verifyOtp__content}
          contentTitle="Mã xác thực"
          contentText="Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập."
        />
        <MyInput
          errorOTP={errOTP}
          isInput={false}
          name="code"
          onSubmitOtp={handleChangeOtp}
        />

        <Button
          btnClass=""
          isHaveIcon={true}
          type="submit"
          content="Tiếp tục"
        />
      </form>
    </>
  );
};

export default VerifyOtp;
