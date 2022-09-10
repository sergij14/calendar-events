export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
}

export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
}

interface SetAuthAction {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}

export type AuthAction = SetAuthAction;
