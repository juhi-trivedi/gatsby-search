const prodConfig = {
  apiKey: "AIzaSyB_EC4kekLVlRJS5Xq3uZXgZEd9_x36PvA",
  authDomain: "gcstarter01.firebaseapp.com",
  databaseURL: "https://gcstarter01.firebaseio.com",
  projectId: "gcstarter01",
  storageBucket: "gcstarter01.appspot.com",
  messagingSenderId: "826368275004"
};

const devConfig = {
  apiKey: "AIzaSyB_EC4kekLVlRJS5Xq3uZXgZEd9_x36PvA",
  authDomain: "gcstarter01.firebaseapp.com",
  databaseURL: "https://gcstarter01.firebaseio.com",
  projectId: "gcstarter01",
  storageBucket: "gcstarter01.appspot.com",
  messagingSenderId: "826368275004"
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor(app) {
    app.initializeApp(config);

    this.db = app.database();
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  doCreateUser = (id, username, email) =>
    this.db.ref(`users/${id}`).set({
      username,
      email,
    });

  onceGetUsers = () => this.db.ref('users').once('value');
}

let firebase;

function getFirebase(app, auth, database) {
  if (firebase) {
    return firebase;
  }

  firebase = new Firebase(app, auth, database);

  return firebase;
}

export default getFirebase;
