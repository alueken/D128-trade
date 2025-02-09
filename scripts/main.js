// Check if Firebase is already initialized
if (!firebase.apps.length) {
  // Initialize Firebase with your config
  const firebaseConfig = {
    apiKey: "AIzaSyAv7pSnjq2mgt5Pa9J9kp_liWImc2oOjmk",
    authDomain: "d128-trading.firebaseapp.com",
    projectId: "d128-trading",
    storageBucket: "d128-trading.firebasestorage.app",
    messagingSenderId: "223986287347",
    appId: "1:223986287347:web:8c1f10b67caaeaabb6ad86",
    measurementId: "G-8W8TQCMCBW"
  };
  firebase.initializeApp(firebaseConfig);
}

// Get auth and firestore instances
const auth = firebase.auth();
const db = firebase.firestore();

// Check if the user is logged in
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed. User:', user); // Debugging line
  if (!user) {
    console.log('No user found. Redirecting to login page...'); // Debugging line
    window.location.href = 'login.html';
  } else {
    console.log('User is logged in:', user.email); // Debugging line
  }
});

// Fetch and display posts
const postsContainer = document.getElementById('posts-container');
if (postsContainer) {
  db.collection('posts')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      postsContainer.innerHTML = ''; // Clear existing posts
      snapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <small>Type: ${post.type}</small>
          <small>Posted by: ${post.userId}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    });
}
