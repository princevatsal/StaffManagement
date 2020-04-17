import {SET_USER, SET_UID, UNSET_USER, CHANGE_AUTHENTICATED} from './types';

const setGlobalUser = (user, state) => {
  return {
    ...state,
    credentials: user.credentials,
  };
};

const setGlobalUid = (id, state) => {
  return {
    ...state,
    uid: id,
  };
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_UID:
      return setGlobalUid(action.payload, state);

    case SET_USER:
      return setGlobalUser(action.payload, state);

    case UNSET_USER:
      return action.payload;

    case CHANGE_AUTHENTICATED:
      return {
        ...state,
        authenticated: !state.authenticated,
      };
    default:
      return state;
  }
};
