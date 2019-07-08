import { AnyAction } from "redux";
import { LOGIN, REGISTER, FETCH_USERS } from "./user.action";
import { IUserState } from "./user.interface";

const initialState: IUserState = {
  count: 0
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, currentUser: action.payload };

    case FETCH_USERS:
      return {
        ...state,
        users: action.payload.data,
        count: action.payload.count || 0
      };

    case REGISTER:
      return state;

    default:
      return state;
  }
};
