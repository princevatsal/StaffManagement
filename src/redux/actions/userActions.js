import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
} from '../types';
import Fire from '../../Fire';

export const loginUser = userData => dispatch => {
  dispatch({type: LOADING_UI});
  Fire.shared
    .signIn(userData)
    .then(res => {
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS});
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = newUserData => dispatch => {
  dispatch({type: LOADING_UI});
  Fire.shared
    .signupUser(newUserData)
    .then(res => {
      dispatch({type: CLEAR_ERRORS});
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => dispatch => {
  Fire.shared.signOutUser();
  dispatch({type: SET_UNAUTHENTICATED});
};

export const getUserData = () => dispatch => {
  dispatch({type: LOADING_USER});
  Fire.shared
    .getUserData()
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
  dispatch({type: LOADING_USER});
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({type: LOADING_USER});
  axios
    .post('/user', userDetails)
    .then(() => dispatch(getUserData()))
    .catch(err => console.log(err));
};
