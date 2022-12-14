import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useActions, useTypedSelector } from "../hooks";

export const NavBar: React.FC = () => {
  const {
    isLoggedIn,
    user: { username },
  } = useTypedSelector((state) => state.auth);

  const { logout } = useActions();

  const menu: MenuProps["items"] = [
    {
      key: 1,
      label: <Link to="/login">Login</Link>,
      icon: <LoginOutlined />,
    },
  ];

  const authedMenu: MenuProps["items"] = [
    {
      key: 2,
      label: username,
      style: { pointerEvents: "none" },
      icon: <UserOutlined />,
    },
    {
      key: 3,
      label: `Log out`,
      onClick: logout,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      {isLoggedIn ? (
        <Menu
          selectable={false}
          theme="dark"
          mode="horizontal"
          items={authedMenu}
        />
      ) : (
        <Menu selectable={false} theme="dark" mode="horizontal" items={menu} />
      )}
    </>
  );
};
