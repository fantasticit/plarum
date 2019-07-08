import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { composeWithDevTools } from "redux-devtools-extension";

import { ILoading } from "./modules/loading/loading.interface";
import { loadingReducer } from "./modules/loading/loading.reducer";

import { IUserState } from "./modules/user/user.interface";
import { userReducer } from "./modules/user/user.reducer";

import { ITagState } from "./modules/tag/tag.interface";
import { tagReducer } from "./modules/tag/tag.reducer";

import { IArticleState } from "./modules/article/article.interface";
import { articleReducer } from "./modules/article/article.reducer";

export interface IState {
  loading: ILoading;
  user: IUserState;
  tag: ITagState;
  article: IArticleState;
}

const rootReducer = combineReducers({
  loading: loadingReducer,
  user: userReducer,
  tag: tagReducer,
  article: articleReducer
});

const storageConfig = {
  key: "root",
  storage: storageSession,
  blacklist: ["name", "age"]
};

const _persistReducer = persistReducer(storageConfig, rootReducer);
export const store = createStore(
  _persistReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
