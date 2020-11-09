import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOnHPkzLLonRuGkfAG6DpbSScRJravP88",
  authDomain: "tenedores-37ef5.firebaseapp.com",
  databaseURL: "https://tenedores-37ef5.firebaseio.com",
  projectId: "tenedores-37ef5",
  storageBucket: "tenedores-37ef5.appspot.com",
  messagingSenderId: "866980809066",
  appId: "1:866980809066:web:00e459ea6a005742de3d13",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
