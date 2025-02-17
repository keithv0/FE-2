
class FooterBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open'})
    }
    connectedCallback() {
        this.render()
    }
    render() {
        const footerHtml = document.createElement('template');

        footerHtml.innerHTML = `
        <style>
            :host{
                display: block;
                background-color: navy;
                text-align: center;
                color: white;
                }
                .cekcek{
                padding: 20px;            
            }
        </style>
        <div class="cekcek">
            <i>Notes App &copy;2025</i>
        </div>
        `;
        this.shadowRoot.appendChild(footerHtml.content.cloneNode(true))
    }

}

customElements.define('footer-bar', FooterBar)