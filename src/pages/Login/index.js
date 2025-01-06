import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // trigger indirect (async or thunk) action creator fetchlogin
      const result = await dispatch(fetchLogin(values));
      if (result) {
        // jump to homepage
        navigate("/");
        // remind user already login
        message.success("Successfully logged in");
      } else {
        // handle login failure
        message.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      // handle unexpected errors
      message.error("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        <Form onFinish={onFinish} validateTrigger="onBlur">
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
