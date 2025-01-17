import React, {createContext, useReducer} from 'react';
import {SET_USER, SET_UID, UNSET_USER, CHANGE_AUTHENTICATED} from './types';

// Global User Context
export const UserContext = createContext();

const initialState = {
  authenticated: false,
  uid: null,
  credentials: {},
};

// Reducers
import {userReducer} from './reducers';

// Global User Provider
export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setGlobalUid = id => {
    dispatch({type: SET_UID, payload: id});
  };

  const setGlobalUser = user => {
    dispatch({type: SET_USER, payload: user});
  };

  const unsetGlobalUser = () => {
    dispatch({type: UNSET_USER, payload: initialState});
  };

  const switchAuthenticated = () => {
    dispatch({type: CHANGE_AUTHENTICATED});
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        setGlobalUid,
        setGlobalUser,
        unsetGlobalUser,
        switchAuthenticated,
      }}>
      {children}
    </UserContext.Provider>
  );
};
