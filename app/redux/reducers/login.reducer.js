   import { initialState } from '../initialState';
import * as t from '../actionTypes';

export const loginReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case t.SET_LOGIN_STATE:
      return {
        ...state,
        user: {...action.payload},
        isLoggedIn: true, 
      };
    case t.SET_LOGOUT_STATE:
      return {
        ...state,
        isLoggedIn: false, 
      };
    default:
      return state;
  }
};