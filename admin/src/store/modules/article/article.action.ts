import {
  fetchArticles as fetchArticlesAjax,
  addArticle as addArticleAjax,
  updateArticle as updateArticleAjax,
  deleteArticle as deleteArticleAjax
} from "../../../api/article";
import { startLoading, stopLoading } from "../loading/loading.action";
import { IArticle } from "./article.interface";

export const FETCH_ARTICLES = "FETCH_ARTICLES";

export const fetchArticles = () => async (dispatch: Function) => {
  startLoading();
  return fetchArticlesAjax()
    .then(data => {
      dispatch({ type: FETCH_ARTICLES, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const addArticle = (article: IArticle) => async (dispatch: Function) => {
  startLoading();
  return addArticleAjax(article)
    .then(data => {
      dispatch(fetchArticles());
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const updateArticle = (Article: IArticle, info: IArticle) => async (
  dispatch: Function
) => {
  startLoading();
  return updateArticleAjax(Article, info)
    .then(data => {
      dispatch(fetchArticles());
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const deleteArticle = (id: string) => async (dispatch: Function) => {
  startLoading();
  return deleteArticleAjax(id)
    .then(() => {
      dispatch(fetchArticles());
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};
