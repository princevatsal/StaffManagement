import {SET_USER, SET_UID, UNSET_USER} from './types';

const setGlobalUser = (user, state) => {
  return {
    ...state,
    user,
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

    default:
      return state;
  }
};
