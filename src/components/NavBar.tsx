import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

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
    },
  ];

  const authedMenu: MenuProps["items"] = [
    {
      key: 1,
      label: username,
      style: { pointerEvents: "none" },
    },
    {
      key: 3,
      label: `Log out`,
      onClick: logout,
    },
  ];

  return (
    <div>
      {isLoggedIn ? (
        <Menu theme="dark" mode="horizontal" items={authedMenu} />
      ) : (
        <Menu theme="dark" mode="horizontal" items={menu} />
      )}
    </div>
  );
};
