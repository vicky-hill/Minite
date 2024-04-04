import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEGDaNwSeKpNNvez8aH4PShBkN3MuWAWc",
  authDomain: "minite-cfc8f.firebaseapp.com",
  projectId: "minite-cfc8f",
  storageBucket: "minite-cfc8f.appspot.com",
  messagingSenderId: "194311945815",
  appId: "1:194311945815:web:1ef8217996fc0c3778ed12"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authorization = {
  resetPassword: (options, email) => async dispatch => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve(dispatch({
            type: success
          }));
        })
        .catch(err => {
          console.log(err)
          reject(dispatch({
            type: failure,
            payload: err.message
          }));
        });
    }

    return new Promise(promise);
  }
}