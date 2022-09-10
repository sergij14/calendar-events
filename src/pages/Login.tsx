import { Form, Input, Row } from "antd";
import Layout from "antd/lib/layout/layout";
import React from "react";
import { LoginForm } from "../components/LoginForm";

const Login:React.FC = () => {
  return <Layout>
    <Row justify="center" align="middle" className="vh-100">
        <LoginForm />
    </Row>
  </Layout>;
};

export default Login;
