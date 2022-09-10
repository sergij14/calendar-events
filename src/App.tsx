import { Layout } from "antd";
import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Event from "./pages/Event";
import Login from "./pages/Login";
import "./styles/index.css";

export enum RouteName {
  LOGIN = "/login",
  EVENT = "/",
}

const App = () => {
  const auth = true;

  const routes = useRoutes([
    {
      path: RouteName.EVENT,
      element: auth ? <Event /> : <Navigate to="/" />,
    },
    {
      path: RouteName.LOGIN,
      element: <Login />,
    },
  ]);

  return (
    <Layout>
      <NavBar />
      <Layout.Content>{routes}</Layout.Content>
    </Layout>
  );
};

export default App;
