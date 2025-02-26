import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd';
import {
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Routes } from '../../routes';
import validateMessages from './validateMessages';
import {
  emailNotVerified,
  signUpFailed,
  signUpSuccessful,
} from './notifications';

const { Item } = Form;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

const SignUp = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const onFinish = async ({ email, password }: { email: string, password: string }) => {
    setIsLoading(true);
    try {
      await signUp(email, password);
      signUpSuccessful();
      emailNotVerified();
      navigate(Routes.HUB);
    } catch (error) {
      form.resetFields();
      console.warn(error);
      signUpFailed(error as Error);
      setIsLoading(false);
    }
  };

  return (
    <div className="small-container">
      <Divider>Sign Up</Divider>
      <Form
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
        form={form}
      >
        <Item
          name="email"
          rules={[{ required: true, type: 'email' }]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Item>
        <Item
          name="password"
          rules={[
            { required: true },
            { pattern: passwordPattern, message: 'Password is too weak!' },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Item>
        <Item
          name="passwordConfirmation"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Passwords don\'t match!'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Password confirmation"
            prefix={<LockOutlined />}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={isLoading}
          >
            Sign Up
          </Button>
        </Item>
      </Form>
      <Link to={Routes.LOGIN} style={{ float: 'right' }}>
        Log In
      </Link>
    </div>
  );
};

export default SignUp;
