class navHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'})
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .header{
                    background-color: rgba(255, 255, 255, 0.15);
                    -webkit-backdrop-filter: blur(10px);
                    backdrop-filter: blur(10px);
                    height: 60px;
                    width: 100%;
                    border-radius: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
            <div class="header">
                <h1 class="header-title">Notes App</h1>
            </div>
        `;
    }
}

customElements.define('nav-header', navHeader)