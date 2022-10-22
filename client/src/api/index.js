import axios from 'axios';

// Auth
const login = (payload) => axios.put('/auth/login', payload);
const signup = (payload) => axios.post('/auth/register', payload);
const logout = (payload) => axios.put('/auth/logout', payload);
const editUser = (payload) => axios.put('/auth/edit', payload);
const editPhoto = (payload) => axios.put('/auth/select/photo', payload);
const getHomeData = (userId) => axios.get(`/auth/home/data/${userId}`);
const deleteAccount = (userId) => axios.delete(`/auth/delete/${userId}`)

// Web_Dev_Quiz
const getQuestions = () => axios.get('/web_dev/questions');
const setProgressScore = (payload, userId) => axios.put(`/web_dev/progress/setscore/${userId}`, payload);
const profileScoreAverages = (userEmail) => axios.get(`/web_dev/profile/getaverage/${userEmail}`);
const setQuizData = (payload, userId) => axios.put(`/web_dev/quizdata/${userId}`, payload);

// MERN_Quiz
const getMERNQuestions = () => axios.get('/mern/questions');
const setMERNQuizData = (payload, userId) => axios.put(`/mern/quizdata/${userId}`, payload);
const setMERNProgressScore = (payload, userId) => axios.put(`/mern/progress/setscore/${userId}`, payload);

// Images
const findImage = (userId) => axios.get(`/img/findImage/${userId}`);
const createImage = (payload) => axios.post('/img/createImage', payload);

const apis = {
  login,
  signup,
  logout,
  deleteAccount,
  getQuestions,
  findImage,
  createImage,
  editUser,
  editPhoto,
  setProgressScore,
  profileScoreAverages,
  setQuizData,
  getMERNQuestions,
  setMERNQuizData,
  setMERNProgressScore,
  getHomeData,
};

export default apis;
