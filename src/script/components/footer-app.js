class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttribute() {
    return ["text"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.render();
    }
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const text = this.getAttribute("text") || "Notes App @2025";

    this.shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
                background-color: navy;
                text-align: center;
                color: white;
                }
                .container-footer{
                padding: 20px;            
            }
        </style>
        <div class="container-footer">
            <i>${text}</i>
        </div>
        `;
  }
}

customElements.define("footer-bar", FooterBar);
