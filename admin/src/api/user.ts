import { http } from "./http";
import { IUser } from "../store/modules/user/user.interface";

export const login = (user: IUser): Promise<any> =>
  http({ method: "POST", url: "/user/login", data: user });

export const register = (user: IUser): Promise<any> =>
  http({ method: "POST", url: "/user/register", data: user });

export const fetchUsers = (): Promise<any> =>
  http({ method: "GET", url: "/user" });

export const updateUser = (user: IUser, info: IUser): Promise<any> =>
  http({ method: "PATCH", url: `/user/${user.id}`, data: info });

export const deleteUser = (id: string): Promise<any> =>
  http({ method: "DELETE", url: `/user/${id}` });
