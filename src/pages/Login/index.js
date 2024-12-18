import "./index.scss";
import { Card, Form, Input, Button } from "antd";
import logo from "@/assets/logo.png";

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form validateTrigger="onBlur">
          <Form.Item
            name="usernmae"
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
            <Input size="large" placeholder="please enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
