import { AnyAction } from "redux";
import { FETCH_ARTICLES } from "./article.action";
import { IArticleState } from "./article.interface";

const initialState: IArticleState = {};

export const articleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload.data
      };

    default:
      return state;
  }
};
