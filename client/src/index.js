/* eslint no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/app';
import storeFactory from './redux/store';

const store = storeFactory();
window.React = React;
console.group('Current-State');
console.log(store.getState());
console.groupEnd();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.querySelector('#root'),
);
