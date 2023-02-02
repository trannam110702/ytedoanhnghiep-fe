import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import SignInWrapper from "./styled";
import { Button, Checkbox, Form, Input, Spin, Alert } from "antd";

import Navbar from "../../components/Navbar";

import bg from "../../assets/imgs/signInbg.png";

import { loginResquest } from "../../api/loginRequest";
import { Store } from "../../store/store";
const SignIn = () => {
  const [hideloading, setHideloading] = useState(false);
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const onFinish = async (value) => {
    try {
      setHideloading(true);
      setMessage("");
      const { username, password } = value;
      const res = await loginResquest(username, password);
      if (res.data?._id) {
        localStorage.setItem("user_id", res.data._id);
        localStorage.setItem("role", res.data.loai);
        dispatch({ type: "login", user_id: res.data._id, role: res.data.loai });
        navigate("/");
      } else {
        setMessage(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setHideloading(false);
    }
  };
  return (
    <SignInWrapper bg={bg}>
      <Navbar />
      <div className="form">
        <div className="title">Đăng nhập</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={hideloading}
            >
              Log in
            </Button>
          </Form.Item>
          <Alert
            style={{ display: message ? "flex" : "none" }}
            message={message}
            type="error"
            showIcon
          />
          <Spin spinning={hideloading} indicator={<LoadingOutlined />} />
        </Form>
      </div>
    </SignInWrapper>
  );
};

export default SignIn;
