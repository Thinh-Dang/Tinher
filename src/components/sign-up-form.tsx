import { GenderEnum } from '@/types/enum';
import { Register } from '@/types/user.type';
import { Form, Input, Select, Button } from 'antd';
import React from 'react';

type Props = {
  data: Register;
  onFinish: (data: any) => void;
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const genderOptions = Object.keys(GenderEnum).map((gender) => {
  return { label: gender, value: gender };
});

const SignUpForm = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <Form
    {...layout}
    name="basic"
    initialValues={{ remember: true }}
    onFinish={props.onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Phone"
      name="phone"
      initialValue={props.data ? props.data.phone : ``}
      rules={[
        { required: true, message: `Please input your phone!` },
        {
          validator: (_, value) =>
            /(0)(3|5|7|8|9)+([0-9]{8})\b/.test(value) && /^[0-9]+$/.test(value)
              ? Promise.resolve()
              : Promise.reject(`Phone is not in correct form!`),
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      initialValue={props.data ? props.data.email : ``}
      rules={[
        { required: true, message: `Please enter your email!` },
        { type: `email`, message: `Email is not in correct form!` },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Full name"
      name="fullname"
      initialValue={props.data ? props.data.fullname : ``}
      rules={[{ required: true, message: `Please enter your full name!` }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Nick name"
      name="nickname"
      initialValue={props.data ? props.data.nickname : ``}
      rules={[{ required: true, message: `Please enter your email!` }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="gender"
      label="Gender"
      rules={[{ required: true, message: `Please select gender!` }]}
    >
      <Select
        placeholder="Select your gender"
        options={genderOptions}
        defaultValue={props.data.gender}
      ></Select>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit" ref={ref}>
        Submit
      </Button>
    </Form.Item>
  </Form>
));

SignUpForm.displayName = `SignUpForm`;

export default SignUpForm;
