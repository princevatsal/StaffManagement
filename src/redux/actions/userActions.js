import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  UNSET_USER,
} from '../types';

export const updateUserUid = uid => dispatch => {
  if (uid) dispatch({type: SET_USER, payload: uid});
  else dispatch({type: UNSET_USER});
};
export const uploadImage = formData => dispatch => {
  // axios
  //   .post('/user/image', formData)
  //   .then(() => {
  //     dispatch(getUserData());
  //   })
  //   .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  // axios
  //   .post('/user', userDetails)
  //   .then(() => dispatch(getUserData()))
  //   .catch(err => console.log(err));
};
