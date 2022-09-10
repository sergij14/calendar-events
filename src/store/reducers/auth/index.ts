import { AuthAction, AuthActionEnum, AuthState } from "./types";

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
};

export default function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return { ...state, loggedIn: true, loading: false };
    default:
      return state;
  }
}
