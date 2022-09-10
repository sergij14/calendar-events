import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const auth = true;
const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const menu: MenuProps["items"] = [
    {
      key: 1,
      label: `Login`,
    },
  ];

  const authedMenu: MenuProps["items"] = [
    {
      key: 3,
      label: `log out`,
    },
    {
      key: 1,
      label: `login`,
    },
    {
      key: 2,
      label: `event`,
    },
  ];

  return (
    <div>
      {auth ? (
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

export default NavBar;
