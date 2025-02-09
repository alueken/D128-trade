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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Ensure auth is properly defined

console.log("Firebase initialized:", app);
console.log("Auth object:", auth);

document.addEventListener("DOMContentLoaded", () => {
  // Register Form Event
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email.endsWith("@d128.org")) {
        alert("Only d128 emails are allowed.");
        return;
      }

      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User registered successfully!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Registration error:", error);
          alert(error.message);
        });
    });
  }

  // Login Form Event
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Attempting login with:", email);

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("Login successful. User:", userCredential.user);
          window.location.href = "index.html";
        })
        .catch((error) => {
