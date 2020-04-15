import {SET_USER, UNSET_USER} from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        credentials: {uid: action.payload},
      };
    case UNSET_USER:
      return initialState;

    default:
      return state;
  }
}
