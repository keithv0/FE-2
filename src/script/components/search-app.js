class InputSearch extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode:'open' })
  }
  connectedCallback() {
    this.render();
    // this.searchNote()
  }
  render() {
    this.innerHTML = `
        <input-app></input-app>
        `;
    this.searchNote();
  }
  searchNote() {
    const inputApp = this.querySelector("input-app");
    const titleInput = inputApp.shadowRoot.querySelector("#title-note");

    titleInput.addEventListener("input", (event) => {
      const keyword = event.target.value.toLowerCase();
      document.dispatchEvent(
        new CustomEvent("note-search", {
          detail: { keyword },
        }),
      );
    });
  }
}
customElements.define("search-app", InputSearch);
