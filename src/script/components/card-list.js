import notesData from "../data/data-note.js";

class CardList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open' })
    }
    connectedCallback() {
        this.render()
    }

    render() {
        let notesHtml='';
        notesData.map((notes) => {
            notesHtml += `
                <div class="note">
                    <h2>${notes.title}</h2>
                    <h5>${notes.body}</h5>
                    <p><${notes.createdAt}/p>
                </div>
            `
        })
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                padding: 20px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                // border: 1px solid whitesmoke; 
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
        `
    }
}

customElements.define('card-list', CardList)