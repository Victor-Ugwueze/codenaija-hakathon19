import app from 'firebase/app';
import { defaultConfig } from './config';

require('firebase/auth');
require('firebase/database');
require('firebase/functions');

export default class Firebase {
  constructor() {
    app.initializeApp(defaultConfig);
    this.app = app;
    this.auth = app.auth();
    this.error = null;
  }

  logout() {
    app.auth().signOut();
  }

  googleLogin() {
    const provider = new app.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  getUser() {
    const usersRefs = app.database().ref('/users');
    usersRefs
      .orderByChild('email')
      .equalTo('email')
      .once('value', snapshot => {
       
      });
  }

}
