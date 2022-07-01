let template = document.createElement('template')
template.innerHTML = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
     <div class="card">       
            <div class="card-body">
              <h5 class="card-title">title</h5>
              <p class="card-text">lorem episum</p>
                 <div class="text-end">
                    <i class="bi bi-star" id="starBtn"></i> <i class="bi bi-trash" id="trashBtn"></i>
                 </div>
          </div>
     </div>
`
class PostComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.toFavorite = this.toFavorite.bind(this);
        this.toTrash = this.toTrash.bind(this);

    }
    toFavorite() {
        let favorites = [];
        const storageValue = JSON.parse(localStorage.getItem('favorites'));
        console.log(storageValue);
        const id = this.getAttribute('postId');

        if (storageValue === null) {
            favorites[0] = id;
        } else {
            if (storageValue.find(item => item == id)) {
                favorites = [...storageValue]
            } else {
                favorites = [...storageValue, id];
            }
        }
        console.log(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(JSON.parse(localStorage.getItem('favorites')));

    }
    toTrash() {
        // Request to delete the post;
        const id = this.getAttribute('postId');
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {method: 'DELETE'})
                .then(res =>{res.json()})
                .then(data=>console.log(data))
                .catch(err => console.log(err));


        this.remove();
    }

    connectedCallback() {
        this.className = "col col-md-4 mt-4";
        this.shadowRoot.querySelector('.card-title').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('.card-text').innerHTML = this.getAttribute('text');


        const star = this.shadowRoot.querySelector('#starBtn');
        const trash = this.shadowRoot.querySelector('#trashBtn');

        star.addEventListener('click', this.toFavorite);
        trash.addEventListener('click', this.toTrash);
    }

    disconnectedCallback() {
        const star = this.shadowRoot.querySelector('#starBtn');
        const trash = this.shadowRoot.querySelector('#trashBtn');

        star.removeEventListener('click', this.toFavorite);
        trash.removeEventListener('click', this.toTrash);
    }
}

window.customElements.define('post-component', PostComponent);

