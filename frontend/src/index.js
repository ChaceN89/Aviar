import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // very important 
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') //get index.html
);


//this section came by default i don't think i need it

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister(); // connected to a deleted serviceworker.js scsript in src
// not sure what this is for
