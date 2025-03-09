import { getNotes } from "../data/data-note.js";

class noteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    document.addEventListener("note-added", () => this.render());
  }

  render() {
    const notes = getNotes();
    console.log("cek di note-list", notes);

    const notesHtml = notes
      .map((note) => {
        `
                <div class="note">
                    <h2>${note.title}</h2>
                    <h5>${note.body}</h5>
                    <small>${new Date(note.createdAt).toLocaleString()}</small>
                </div>
            `;
      })
      .join("");

    this.shadowRoot.innerHTML = `
            <style>
                
                :host {
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat();
                    gap: 10px;
                    border: 1px solid red; 
                }
                .note {
                    color: aliceblue;
                    border: 1px solid yellow;
                    padding: 20px;
                    border-radius: 10px;
                    line-height: 1.6rem;
                }
            </style>
            ${notesHtml}
        `;
  }
}

customElements.define("note-list", noteList);
