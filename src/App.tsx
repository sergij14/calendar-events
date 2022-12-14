import { Layout } from "antd";
import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useActions, useTypedSelector } from "./hooks";
import { IUser } from "./models/IUser";
import Event from "./pages/Event";
import Login from "./pages/Login";
import "./styles/index.css";

export enum RouteName {
  LOGIN = "/login",
  EVENT = "/",
}

const App = () => {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const { setAuth, setUser } = useActions();
  const routes = useRoutes([
    {
      path: RouteName.EVENT,
      element: isLoggedIn ? <Event /> : <Navigate to="login" />,
    },
    {
      path: RouteName.LOGIN,
      element: isLoggedIn ? <Navigate to="/" /> : <Login />,
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
      setUser({ username: localStorage.getItem("username") } as IUser);
    }
  }, []); //eslint-disable-line

  return (
    <Layout>
      <NavBar />
      <Layout.Content>{routes}</Layout.Content>
    </Layout>
  );
};

export default App;
