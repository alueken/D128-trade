const db = firebase.firestore();

// Create a new post
document.getElementById('post-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const post = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    type: document.getElementById('type').value,
    userId: auth.currentUser.uid,
    timestamp: new Date()
  };

  db.collection('posts').add(post)
    .then(() => {
      alert('Post created successfully!');
      window.location.href = 'index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Fetch and display posts
const postsContainer = document.getElementById('posts-container');
if (postsContainer) {
  db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    postsContainer.innerHTML = '';
    snapshot.forEach((doc) => {
      const post = doc.data();
      postsContainer.innerHTML += `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <small>Type: ${post.type}</small>
        </div>
      `;
    });
  });
}
