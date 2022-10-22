const stateData = {
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    _id: '',
    isLoggedIn: false,
    userImage: [],
    gameStatus: {
      Web_Dev: {
        passed: false,
        highestScore: 0,
      },
      MERN: {
        passed: false,
        highestScore: 0,
      },
    },
    loading: false,
    languages: [
      {
        title: 'html',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'css',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'javascript',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'jquery',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'bootstrap',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'mongodb',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'express',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'react',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
      {
        title: 'node',
        progress: 0,
        skillLevel: 'Beginner',
        completed: 'N/A',
      },
    ],
  },
};

export default stateData;
