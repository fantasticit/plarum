import { IArticle } from "./../store/modules/article/article.interface";
import { http } from "./http";

export const fetchArticle = (id: string): Promise<any> =>
  http({ method: "GET", url: `/article/${id}` });

export const fetchArticles = (): Promise<any> =>
  http({ method: "GET", url: "/article" });

export const addArticle = (article: IArticle): Promise<any> =>
  http({ method: "POST", url: `/article`, data: article });

export const updateArticle = (
  article: IArticle,
  info: IArticle
): Promise<any> =>
  http({ method: "PATCH", url: `/article/${article.id}`, data: info });

export const deleteArticle = (id: string): Promise<any> =>
  http({ method: "DELETE", url: `/article/${id}` });
