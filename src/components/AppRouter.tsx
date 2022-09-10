import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";

const AppRouter = () => {
  const auth = true;
  return (
    <Routes>
      {auth
        ? privateRoutes.map(({ Component, path, exact }) => (
            <Route path="activity" element={() => <Component />} />
          ))
        : publicRoutes.map(({ Component, path, exact }) => (
            <Route path="activity" element={() => <Component />} />
          ))}
    </Routes>
  );
};

export default AppRouter;
