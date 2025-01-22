import { Form, Input, Button, Space } from "antd";

export const LoginForm = ({ onFinish, onRegister }) => {
  return (
    <Form name="basic" onFinish={onFinish} validateTrigger="onBlur">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username",
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Username only contains letters and numbers",
          },
        ]}
      >
        <Input size="large" placeholder="please enter your username" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
          {
            pattern: /^[a-zA-Z0-9]{8,}$/,
            message:
              "Password contains at least 8 characters long with letters and numbers",
          },
        ]}
      >
        <Input.Password size="large" placeholder="please enter your password" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
          <Button type="default" size="large" onClick={onRegister}>
            Sign Up
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
