import { AnyAction } from "redux";
import { ILoading } from "./loading.interface";
import { START_LOADING, STOP_LOADING } from "./loading.action";

const initialState: ILoading = {
  loading: false
};

export const loadingReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case STOP_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};
