async function getRandomPost() {
  const randomPostId = Math.floor((Math.random() * 100) + 1);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomPostId}`);
  return response.json();
}

export default {
  getRandomPost,
};
