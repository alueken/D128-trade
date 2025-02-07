// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv7pSnjq2mgt5Pa9J9kp_liWImc2oOjmk",
  authDomain: "d128-trading.firebaseapp.com",
  projectId: "d128-trading",
  storageBucket: "d128-trading.firebasestorage.app",
  messagingSenderId: "223986287347",
  appId: "1:223986287347:web:8c1f10b67caaeaabb6ad86",
  measurementId: "G-8W8TQCMCBW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth functions
const auth = firebase.auth();

// Login
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Register
document.getElementById('register-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email.endsWith('@d128.org')) {
    alert('Only d128 emails are allowed.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById('logout')?.addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});
