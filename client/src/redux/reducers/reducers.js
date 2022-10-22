import C from '../constants';
// Reducers are pure functions that take the current state along with an action
// as arguments and use them to create and return a new state

function newScoreProgress(state = {}, action, i) {
  switch (action.type) {
    case C.UPDATE_PROGRESS: return { ...state, progress: action.scoreData[i].percent };
    default: return state;
  }
};

function userData(state = {}, action) {
  switch (action.type) {
    case C.TOGGLE_LOADING: return { ...state, loading: action.loading };
    case C.CREATE_USER: return { ...state, ...action.payload };
    case C.LOGIN_USER: return { ...state, ...action.payload };
    case C.LOGOUT_USER: return { ...state, ...action.userData };
    case C.ADD_USER_IMAGE: return { ...state, userImage: action.id };
    case C.EDIT_USER: return { ...state, ...action.payload };
    case C.EDIT_PHOTO: return { ...state, ...action.payload };

    case C.UPDATE_PROGRESS: return {
      ...state,
      languages: state.languages.map((language, i) => newScoreProgress(language, action, i)),
    };


    case C.SET_HIGHEST_SCORE: return {
      ...state,
      gameStatus: {
        ...state.gameStatus,
        Web_Dev: {
          ...state.gameStatus.Web_Dev,
          ...action.payload,
        },
      },
    };

    case C.SET_MERN_HIGHEST_SCORE: return {
      ...state,
      gameStatus: {
        ...state.gameStatus,
        MERN: {
          ...state.gameStatus.MERN,
          ...action.payload,
        },
      },
    };

    default: return state;
  }
};

export default userData;
