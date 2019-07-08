import { AnyAction } from "redux";
import { FETCH_TAGS } from "./tag.action";
import { ITagState } from "./tag.interface";

const initialState: ITagState = {};

export const tagReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        ...state,
        tags: action.payload.data
      };

    default:
      return state;
  }
};
