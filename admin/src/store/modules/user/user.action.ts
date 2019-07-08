import {
  login as loginAjax,
  register as registerAjax,
  fetchUsers as fetchUsersAjax,
  updateUser as updateUserAjax,
  deleteUser as deleteUserAjax
} from "../../../api/user";
import { startLoading, stopLoading } from "../loading/loading.action";
import { IUser } from "./user.interface";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const FETCH_USERS = "FETCH_USERS";

export const login = (user: IUser) => async (dispatch: Function) => {
  startLoading();
  return loginAjax(user)
    .then(data => {
      dispatch({ type: LOGIN, payload: data.data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const register = (user: IUser) => async (dispatch: Function) => {
  startLoading();
  return registerAjax(user)
    .then(data => {
      dispatch({ type: REGISTER, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const fetchUsers = () => async (dispatch: Function) => {
  startLoading();
  return fetchUsersAjax()
    .then(data => {
      dispatch({ type: FETCH_USERS, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const updateCurrentUser = (user: IUser, info: IUser) => async (
  dispatch: Function
) => {
  startLoading();
  return updateUserAjax(user, info)
    .then(data => {
      dispatch({ type: LOGIN, payload: data.data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const updateUser = (user: IUser, info: IUser) => async (
  dispatch: Function
) => {
  startLoading();
  return updateUserAjax(user, info)
    .then(data => {
      dispatch(fetchUsers());
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const deleteUser = (id: string) => async (dispatch: Function) => {
  startLoading();
  return deleteUserAjax(id)
    .then(() => {
      dispatch(fetchUsers());
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};
