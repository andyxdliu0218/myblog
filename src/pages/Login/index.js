import "./index.scss";
import { Card, message } from "antd";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useState } from "react";
import { signUpAPI } from "@/apis/user";

const Login = () => {
  const [regist, setRegist] = useState(false);
  const onRegister = () => {
    setRegist(!regist);
  };

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

  const onFinishRegister = async (values) => {
    try {
      // trigger indirect (async or thunk) action creator fetchlogin
      const result = await signUpAPI(values);
      if (result.code === "200") {
        // switch to login form
        onRegister();
        message.success("Successfully registered");
      } else if (result.code === "409") {
        // handle Invalid username
        message.error(result.message);
      }
    } catch (error) {
      // handle unexpected errors
      message.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        {!regist && <img className="login-logo" src={logo} alt="Login Logo" />}
        {!regist && <LoginForm onFinish={onFinish} onRegister={onRegister} />}
        {regist && (
          <RegisterForm
            onFinishRegister={onFinishRegister}
            onRegister={onRegister}
          />
        )}
      </Card>
    </div>
  );
};
export default Login;
