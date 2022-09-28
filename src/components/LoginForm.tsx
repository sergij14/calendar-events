import { Alert, Button, Card, Form, Input } from "antd";
import React from "react";
import { useActions, useTypedSelector } from "../hooks";
import { IUser } from "../models/IUser";
import { rules } from "../utils/rules";

export const LoginForm: React.FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const { login } = useActions();
  
  const onFinish = (values: IUser) => {
    login(values.username, values.password);
  };

  return (
    <Card>
      <Form
        name="login-form"
        onFinish={onFinish}
        autoComplete="off"
      >
        {error && (
          <Alert
            style={{ marginBottom: "24px" }}
            message={error}
            type="error"
          />
        )}
        <Form.Item
          label="Username"
          name="username"
          rules={[rules.required("Please enter username")]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[rules.required("Please enter password")]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Login
          </Button>
        </Form.Item>
        <Alert type="warning" message="login: sergij14 | pass: 12345678" />
      </Form>
    </Card>
  );
};
