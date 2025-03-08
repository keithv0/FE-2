import { getDataNonArchive, getDataArchive, archiveNote, unArchiveNote, deleteNote } from "../data/remote/notes-api.js";

class CardList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open' })
        this.keyword = "";
        this.isLoading = true;
    }
    async connectedCallback() {
        await this.fetchNotes()
        document.addEventListener('note-updated', () => this.fetchNotes())
        document.addEventListener('note-added', () => this.fetchNotes())
        document.addEventListener('note-search', (event) => {
            this.keyword = event.detail.keyword;
            this.render()
        })
    }

    async fetchNotes() {
        this.isLoading = true;
        this.render()

        this.notes = this.getAttribute("data-archive") === "true" ? await getDataArchive() : await getDataNonArchive();

        this.isLoading = false;
        this.render()
    }

    // Highlight Search
    highlightTeks(txt) {
        if(!txt) return;
        if(!this.keyword) return txt;

        const regex = new RegExp(`(${this.keyword})`, "gi");
        return txt.replace(regex, `<span class="highlight">$1</span>`)
    }
    async render() {
        // Loading Logic
        const getLoading = document.querySelector('loading-app');

        if(this.isLoading) {
            getLoading.style.display = "block";
        } else {
            getLoading.style.display = "none";
        }

        // Get Attribute Archive From Html
        const isArchive = this.getAttribute("data-archive") === "true";
        let filterNote = this.notes.filter(note => note.archived === isArchive)

        if(this.keyword) {
            filterNote = filterNote.filter(note => 
                note.title.toLowerCase().includes(this.keyword) ||
                note.body.toLowerCase().includes(this.keyword)
            )
        }
        
        let notesHtml='';
        if (filterNote.length === 0) {
            notesHtml = '<p class="not-found-data">Data tidak ditemukan</p>'
        } else {

            filterNote.forEach((notes) => {
                notesHtml += `
                <div class="note">
                    <h2 class="note-title">${this.highlightTeks(notes.title)}</h2>
                    <h5 class="note-body">${this.highlightTeks(notes.body)}</h5>
                    <div class="container-button">
                        <button class="btn-archive">
                            ${notes.archived ? "Unarchive" : "Archive"}
                        </button>
                        <button class="btn-delete">Delete</button>
                    </div>
                </div>
                `;
            });
        }
            this.shadowRoot.innerHTML = `
            <style>

            :host{
                padding: 20px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
            }
            .note {
                color: aliceblue;
                border: 1px solid yellow;
                padding: 20px;
                border-radius: 10px;
                line-height: 1.6rem;
                
            }
            button{
                width: 100%;
                background-color: transparent;
                color: white;
                border: 1px solid white;
                cursor: pointer;
                padding: 5px;
                border-radius: 5px;
            }
            .not-found-data{
                width: 100%;
                font-size: 1.3rem;
                font-weight: 700;
                color: rgb(117, 117, 117);
                margin: 0 0;
            }

            .highlight{
                background-color: rgba(255, 166, 0, 0.499);
            }

            @media only screen and (max-width:1300px) {
                :host{
                    grid-template-columns: repeat(3, 1fr)
                }
            }
            @media only screen and (max-width:1024px) {
                :host{
                    grid-template-columns: repeat(2, 1fr)
                }
            }
            @media only screen and (max-width:480px) {
                :host{
                    grid-template-columns: 1fr;
                }
            }
            </style>
            ${notesHtml}
            <popup-app></popup-app>
        `;
        if (filterNote.length > 0 ) {
            this.handleButton(filterNote)
        }
    }
    handleButton(filterNote) {
        // Pop Up
        const getPopup = this.shadowRoot.querySelector('popup-app');
        const containerModal = getPopup.shadowRoot.querySelector('.container-modal');
        const cancelBtn = getPopup.shadowRoot.querySelector('.btn-cancel');
        const confirmBtn = getPopup.shadowRoot.querySelector('.btn-delete');

        // Edit Button
        const btnArchive = this.shadowRoot.querySelectorAll('.btn-archive');
        const btnDelete = this.shadowRoot.querySelectorAll('.btn-delete');
        const isArchive = this.getAttribute("data-archive") === "true";

        let noteDelete = null;

        // Edit Btn Archive/Non
        btnArchive.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                if(!filterNote[index]) return;

                const noteId = filterNote[index].id;
                await (isArchive ? unArchiveNote(noteId) : archiveNote(noteId));
                await this.fetchNotes()
            })
        })

        // Edit Btn Delete
        btnDelete.forEach((btn, index) => {
            btn.addEventListener('click', async () => {
                if(!filterNote[index]) return;
                
                noteDelete = filterNote[index].id;
                containerModal.style.display = "block";
                // await this.fetchNotes();
            })
        })

        // Confirm Btn Popup
        confirmBtn.addEventListener('click', async () => {
            if(!noteDelete) return;
            await deleteNote(noteDelete)
        })

        // Cancel Btn Popup
        cancelBtn.addEventListener('click', async () => {
            containerModal.style.display = "none"
            noteDelete = null;
        })

    }  

}

customElements.define('card-list', CardList)
