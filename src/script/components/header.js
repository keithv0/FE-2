class navHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="header">
                <h1>Notes App</h1>
            </div>
        `;
    }
}

customElements.define('nav-header', navHeader)