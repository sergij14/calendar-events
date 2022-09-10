import { Layout } from "antd";
import React from "react";
import { useRoutes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Event from "./pages/Event";
import Login from "./pages/Login";
import "./styles/index.css";

export enum RouteName {
  LOGIN = "/login",
  EVENT = "/",
}

const App = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const routes = useRoutes([
    {
      path: RouteName.EVENT,
      element: isLoggedIn ? <Event /> : <Login />,
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
