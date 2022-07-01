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

    }
    makeFavorite() {
        console.log('makeFavorite');
    }
    makeTrash() {
        console.log('makeTrash');
    }

    connectedCallback() {
        this.className="col col-md-4 mt-4";
        this.shadowRoot.querySelector('.card-title').innerHTML = this.getAttribute('title');
        this.shadowRoot.querySelector('.card-text').innerHTML = this.getAttribute('text');


        const toFavorte = this.shadowRoot.querySelector('#starBtn');
        const toTrash = this.shadowRoot.querySelector('#trashBtn');

        toFavorte.addEventListener('click', this.makeFavorite);
        toTrash.addEventListener('click', this.makeTrash);
    }

    disconnectedCallback() {
        const toFavorte = this.shadowRoot.querySelector('#starBtn');
        const toTrash = this.shadowRoot.querySelector('#trashBtn');

        toFavorte.removeEventListener();
        toTrash.removeEventListener();
    }
}

window.customElements.define('post-component', PostComponent);

