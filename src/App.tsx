import { Layout } from "antd";
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
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
      element: isLoggedIn ? <Event /> : <Login />,
    },
    {
      path: RouteName.LOGIN,
      element: isLoggedIn ? <Event /> : <Login />,
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
      setUser({ username: localStorage.getItem("username") } as IUser);
    }
  }, []);

  return (
    <Layout>
      <NavBar />
      <Layout.Content>{routes}</Layout.Content>
    </Layout>
  );
};

export default App;
