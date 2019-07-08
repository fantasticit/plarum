import { IUser } from "../user/user.interface";

export interface IArticle {
  id?: string;
  title?: string;
  summary?: string;
  content?: string;
  html?: string;
  tags?: Array<any>;
  cover?: string;
  status?: string;
  author?: IUser;
}

export interface IArticleState {
  articles?: IArticle[];
}
