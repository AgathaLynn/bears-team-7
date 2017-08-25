import * as firebase from 'firebase';
import { FIREBASE_API_KEY } from 'react-native-dotenv'; // eslint-disable-line

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'bearsteam7-1ace5.firebaseapp.com',
  databaseURL: 'https://bearsteam7-1ace5.firebaseio.com',
  projectId: 'bearsteam7-1ace5',
};

// export main App and Db
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.database;
