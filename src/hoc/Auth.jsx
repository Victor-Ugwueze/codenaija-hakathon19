import React, { Component } from 'react';
import { withFirebase } from '../firebase/firebase-context';

export default function(ComposedComponent) {
  class Authenticate extends Component {
    state = {
      isLoaded: false,
    };

    async componentDidMount() {
      const { firebase, history } = this.props;

      firebase.auth.onAuthStateChanged((user) => {
        console.log(user, 'hshhshshh')
        if (!user) {
          firebase.logout();
          history.push('/login');
          return;
        }
        this.setState((state) => ({ ...state, isLoaded: true }));
      });
    }

    render() {
      const { isLoaded } = this.state;

      return isLoaded ? <ComposedComponent {...{ ...this.props }} /> : null;
    }
  }

  return withFirebase(Authenticate);
}
