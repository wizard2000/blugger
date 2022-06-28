const albumDom = document.getElementById('album')
fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
    .then(res => res.json())
    .then(data => {
        loadAlbum(data);
    })
    .catch(err => console.log(err));

const loadAlbum = (album) => {
    
    album.forEach(photo => {
        console.log(photo);
        const photoChild = createPhoto(photo);

        albumDom.appendChild(photoChild);

    });
}
const createPhoto = ({url , title , id}) => {
    const photo = document.createElement('div')
    photo.classList.add('col', 'col-md-4', 'mt');

    photo.innerHTML = `
        <div class="card">
        <img src="${url}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title} - ${id} </h5>
            </div>
        </img>
        </div>
        `
    return photo;
}
