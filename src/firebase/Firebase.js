import app from 'firebase/app';
import { defaultConfig } from './config';

require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
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
    this.auth.signInWithEmailAndPassword(provider);
  }

  searchVehicles = async ({ query, value }) => {
    const vehicleRef = app.firestore().collection('vehicles');
    const result = await vehicleRef.where(query, '==', value).get();
    return result;
  }


  async sendReport(data) {
     await this.app.firestore().collection('vehicles')
      .add({
       ...data
    });
  }

  async uploadToFirebase(file) {
    const date = new Date();
    const storageRef = this.app.storage().ref();
    const fileRef = storageRef.child(
      `vehicles/${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${file.name}`,
    );
    const storageResponse = await fileRef.put(file);
    return storageResponse.ref.getDownloadURL();
  }
}
