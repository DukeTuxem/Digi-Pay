import { registerRootComponent } from "expo";
import * as firebase from "firebase";

import App from "./src/App";

const config = {
  apiKey: "AIzaSyCASxg3MyGfA-5KAmxKbHPVFALKjqbE2YA",
  authDomain: "digipay-b9676.firebaseapp.com",
  databaseURL: "https://digipay-b9676.firebaseio.com",
  projectId: "digipay-b9676",
  storageBucket: "digipay-b9676.appspot.com",
  messagingSenderId: "101822839867"
};
firebase.initializeApp(config);

// Expo entry point
registerRootComponent(App);
