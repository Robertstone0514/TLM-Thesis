import { connect } from 'react-redux';

// Import Page
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Quiz from '../../pages/Quiz/Quiz';
import Home from '../../pages/Home';
import WebDevQuiz from '../../pages/WebDevQuiz/WebDevQuiz';
import MERNQuiz from '../../pages/MERNQuiz/MERNQuiz';
import Profile from '../../pages/Profile/Profile';

// Import Component
import MainNav from '../../components/MainNav';
import QuizScores from '../../components/Web_Dev_Quiz/QuizScores';
import MERNQuizScores from '../../components/MERN_Quiz/MERNQuizScores';
import UserDropdownMenu from '../../components/MainNav/UserDropdownMenu';

// Import Actions
import {
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
} from '../actions';

// Containers
export const NavContainer = connect(
  ({ userData }) => ({ userData }), ({ logoutUser }),
)(MainNav);

export const LoginContainer = connect(
  ({ userData }) => ({ userData }), ({ loginUser, toggleLoading }),
)(Login);

export const SignupContainer = connect(
  ({ userData }) => ({ userData }), ({ createUser, toggleLoading, addUserImage }),
)(Signup);

export const QuizContainer = connect(
  ({ userData }) => ({ userData }), null,
)(Quiz);

export const HomeContainer = connect(
  ({ userData }) => ({ userData }), null,
)(Home);

export const WebDevQuizContainer = connect(
  ({ userData }) => ({ userData }), null,
)(WebDevQuiz);

export const MERNQuizContainer = connect(
  ({ userData }) => ({ userData }), null,
)(MERNQuiz);

export const QuizScoresContainer = connect(
  ({ userData }) => ({ userData }), ({ updateScores, setHighScore }),
)(QuizScores);

export const MERNQuizScoresContainer = connect(
  ({ userData }) => ({ userData }), ({ updateScores, setMERNHighScore }),
)(MERNQuizScores);

export const UserDropdownContainer = connect(
  ({ userData }) => ({ userData }), ({ logoutUser }),
)(UserDropdownMenu);

export const ProfileContainer = connect(
  ({ userData }) => ({ userData }), { editUser, editUserPhoto, updateScores },
)(Profile);
