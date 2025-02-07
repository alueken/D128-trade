// Check if the user is logged in
auth.onAuthStateChanged((user) => {
  if (!user) {
    // Redirect to login page if not logged in
    window.location.href = 'login.html';
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
