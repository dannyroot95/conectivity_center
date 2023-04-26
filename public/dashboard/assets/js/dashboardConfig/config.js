var firebaseConfig = {
  apiKey: "AIzaSyCsBRhwk6buux9DQPOUDKh1u8bozo1pdu0",
  authDomain: "connect-center-1a0df.firebaseapp.com",
  projectId: "connect-center-1a0df",
  storageBucket: "connect-center-1a0df.appspot.com",
  messagingSenderId: "981972587073",
  appId: "1:981972587073:web:924af85d453ab1a8d72cc0"
  };

  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //var uid = user.uid;
      localStorage.setItem("session",true)
    } else {
      localStorage.setItem("currentUser","")
      localStorage.setItem("session",false)
    }
  });