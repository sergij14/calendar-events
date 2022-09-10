import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { loggedIn } = useTypedSelector((state) => state.auth);

  const menu: MenuProps["items"] = [
    {
      key: 1,
      label: `Login`,
    },
  ];

  const authedMenu: MenuProps["items"] = [
    {
      key: 3,
      label: `Log out`,
    },
  ];

  return (
    <div>
      {loggedIn ? (
        <>
          <Menu theme="dark" mode="horizontal" items={authedMenu} />
        </>
      ) : (
        <>
          <Menu theme="dark" mode="horizontal" items={menu} />
        </>
      )}
    </div>
  );
};

