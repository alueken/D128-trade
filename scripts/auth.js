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
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized:", app);

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Register Form Event
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email.endsWith("@d128.org")) {
        alert("Only d128 emails are allowed.");
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered successfully!");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Registration error:", error);
        alert(error.message);
      }
    });
  }

  // Login Form Event
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Attempting login with:", email);

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful. User:", userCredential.user);
        window.location.href = "index.html";
      } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
      }
    });
  }

  // Logout Event
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "login.html";
    });
  }
});
