const postDom = document.getElementById('posts');
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        loadPosts(data);
    })
    .catch(err => console.log(err));

const loadPosts = post => {
    post.forEach(post => {
        const postChild = createPost(post);
        postDom.appendChild(postChild);

    });
}
const createPost = ({title , body , id}) => {
    const newPost = document.createElement('post-component')
    newPost.setAttribute('title',title);
    newPost.setAttribute('text',body);
    newPost.setAttribute('postId',id);
    return newPost;
}
