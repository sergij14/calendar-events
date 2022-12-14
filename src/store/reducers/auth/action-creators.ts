import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";

export const AuthActionCreators = {
  setUser: (payload: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload,
  }),
  setAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        try {
          const res = await UserService.getUsers();
          const user = res.data.find(
            (user: any) =>
              user.username === username && user.password === password
          );
          if (user) {
            dispatch(AuthActionCreators.setAuth(true));
            dispatch(AuthActionCreators.setError(""));
            dispatch(AuthActionCreators.setUser({ ...user }));
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", username);
          } else {
            dispatch(
              AuthActionCreators.setError("Incorrect username or password")
            );
          }
          AuthActionCreators.setIsLoading(false);
        } catch (e) {
          dispatch(AuthActionCreators.setError("Something went wrong"));
          AuthActionCreators.setIsLoading(false);
        }
      }, 1500);
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setAuth(false));
    dispatch(AuthActionCreators.setUser({} as IUser));
  },
};
