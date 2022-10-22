import C from '../constants';

const toggleLoading = (loading) => ({ type: C.TOGGLE_LOADING, loading });
const createUser = (payload) => ({ type: C.CREATE_USER, payload });
const loginUser = (payload) => ({ type: C.LOGIN_USER, payload });
const logoutUser = ({ userData }) => ({ type: C.LOGOUT_USER, userData });
const updateScores = (scoreData) => ({ type: C.UPDATE_PROGRESS, scoreData });
const addUserImage = (id) => ({ type: C.ADD_USER_IMAGE, id });
const editUser = (payload) => ({ type: C.EDIT_USER, payload });
const editUserPhoto = (payload) => ({ type: C.EDIT_PHOTO, payload });
const setHighScore = (payload) => ({ type: C.SET_HIGHEST_SCORE, payload });
const setMERNHighScore = (payload) => ({ type: C.SET_MERN_HIGHEST_SCORE, payload });

export {
  toggleLoading,
  createUser,
  loginUser,
  logoutUser,
  updateScores,
  addUserImage,
  editUser,
  editUserPhoto,
  setHighScore,
  setMERNHighScore,
};
