export interface IUser {
  id: string;
  name: string;
  role: string;
  createAt: "string";
  updateAt: "string";
  lastLoginAt: "string";
  articles: [];
}

export interface IUserState {
  currentUser?: IUser;
  users?: IUser[];
  count: number;
}
