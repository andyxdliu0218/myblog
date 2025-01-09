import { Form, Input, Button, Space } from "antd";

export const RegisterForm = ({ onFinishRegister, onRegister }) => {
  return (
    <Form onFinish={onFinishRegister} validateTrigger="onBlur">
      <Form.Item
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

      <Form.Item
        name="nickname"
        rules={[
          {
            required: true,
            message: "Please input your nickname",
          },
          {
            pattern: /^[a-zA-Z0-9]{1,}$/,
            message: "Nickname contains at least 1 character long",
          },
        ]}
      >
        <Input size="large" placeholder="please input your nickname" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" size="large">
            Register
          </Button>
          <Button type="primary" size="large" onClick={onRegister}>
            Back to Login
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
