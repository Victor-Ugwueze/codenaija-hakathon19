import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-widgets/dist/css/react-widgets.css';
// import "../node_modules/react-datepicker/dist/react-datepicker.css";
import App from './App';
import './App.css';

import Firebase, { FirebaseContext } from './firebase';


const AppProvider = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
);


ReactDOM.render(<AppProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
