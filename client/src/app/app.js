import './app.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
// Import Containers from Redux
import {
  LoginContainer,
  SignupContainer,
  QuizContainer,
  HomeContainer,
  WebDevQuizContainer,
  ProfileContainer,
  MERNQuizContainer,
} from '../redux/containers';

// Import Pages
import Error404 from '../pages/404';

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginContainer} />
    <Route exact path="/register" component={SignupContainer} />
    <Route exact path="/home" component={HomeContainer} />
    <Route exact path="/quiz" component={QuizContainer} />
    <Route exact path="/quiz/web_dev" component={WebDevQuizContainer} />
    <Route exact path="/quiz/mern" component={MERNQuizContainer} />
    <Route exact path="/profile" component={ProfileContainer} />
    {/* If the URL Route does not exist, show 404 Page */}
    <Route component={Error404} />
  </Switch>
);

export default App;
