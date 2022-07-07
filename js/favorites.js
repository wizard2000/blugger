const postDom = document.getElementById('posts');
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        loadPosts(data);
    })
    .catch(err => console.log(err));

const loadPosts = post => {

    const storageValue = JSON.parse(localStorage.getItem('favorites'));
    if(storageValue === null  || storageValue.lenght == 0){
       postDom.innerHTML=`No favorite post is chosen`
       return
    }
    post.forEach(post => {
        if(storageValue.indexOf(post.id.toString()) != -1){
            const postChild = createPost(post);
            postDom.appendChild(postChild);
        }
       

    });
}
const createPost = ({title , body , id}) => {
    const newPost = document.createElement('post-component')
    newPost.setAttribute('title',title);
    newPost.setAttribute('text',body);
    newPost.setAttribute('postId',id);
    return newPost;
}
