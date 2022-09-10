import React from "react";
import Event from "../pages/Event";
import Login from "../pages/Login";

export interface Iroutes {
  path: string;
  Component: React.ComponentType;
  exact: boolean;
}

export enum RouteName {
  LOGIN = "/login",
  EVENT = "/",
}

export const privateRoutes: Iroutes[] = [
  {
    path: RouteName.EVENT,
    Component: Event,
    exact: true,
  },
];

export const publicRoutes: Iroutes[] = [
  {
    path: RouteName.LOGIN,
    Component: Login,
    exact: true,
  },
];
