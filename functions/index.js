const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.sendSMS = functions.https.onCall( ({ message }, context) => {
  const config = functions.config();
  try {
    const options = {
      apiKey: config.afk.key,         // use your sandbox app API key for development in the test environment
      username: config.afk.username,      // use 'sandbox' for development in the test environment
    };
    const AfricasTalking = require('africastalking')(options);

    const sms = AfricasTalking.SMS

    const messageObject = {
      to: ['+2348101755672'],
      message,
      enque: true
    }
      sms.send(messageObject)
      .then( response => {
          console.log(response);
      })
      .catch( error => {
          console.log(error);
      });
  } catch (error) {
    throw new functions.https.HttpsError(error);
  }
});