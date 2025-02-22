import notesData from "../data/data-note.js";
import { getNotes } from "../data/data-note.js";

class CardList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:'open' })
        this.keyword = "";
    }
    connectedCallback() {
        this.render()
        document.addEventListener('note-updated', () => this.render())
        document.addEventListener('note-added', () => this.render())
        document.addEventListener('note-search', (event) => {
            
            this.keyword = event.detail.keyword;
            this.render()
        })
    }

    render() {
        const getNotesData = getNotes()
        const isArchive = this.getAttribute("data-archive") === "true";
        
        let filterNote = getNotesData.filter(note => note.archived === isArchive)

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
                <h2 class="note-title">${notes.title.substring(0,13)}...</h2>
                <h5 class="note-body">${notes.body.substring(0, 95)}...</h5>
                <div class="container-button">
                <button class="button-aktif"></button>
                <button class="button-archive"></button>
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
                // border: 1px solid whitesmoke; 
            }
            .note {
                color: aliceblue;
                border: 1px solid yellow;
                padding: 20px;
                border-radius: 10px;
                line-height: 1.6rem;
                
            }
            .note-title{
                // border: 1px solid red;          
            }
            .note-body{
                // border: 1px solid red;
                }
            .container-button{
                border: 1px solid red;
                display: flex;
                align-items: end;
            }
            button{
                width: 100%;
                background-color: transparent;
                color: white;
                border: 1px solid white;
                cursor: pointer;
            }
            </style>
            ${notesHtml}
        `;
        if (filterNote.length > 0 ) {
            this.handleButton()
        }
    }
    handleButton() {
        // maping status
        const getNotesData = getNotes()
        const isArchive = this.getAttribute("data-archive") === "true";
        const filterNote = getNotesData.filter((note) => note.archived === isArchive)

          // ambil element
          const teksButtonAktif = this.shadowRoot.querySelectorAll('.button-aktif')
          const teksButtonArchive = this.shadowRoot.querySelectorAll('.button-archive')

          if(teksButtonAktif.length !=filterNote.length || teksButtonArchive.length != filterNote.length) {
            console.warn("Jumlah button tidak sesuai dengan jumlah data")
            
          }
        filterNote.forEach((note, index) => {
            // indexing
            const btnAktif = teksButtonAktif[index]       
            const btnArchive = teksButtonArchive[index]

            if (!btnAktif || !btnArchive) return;

            if(!note.archived){
                btnAktif.innerHTML = "Archive"
                btnArchive.style.display = "none"
            } else {
                btnArchive.innerHTML = "Unarchive"
                btnAktif.style.display = "none"

            }

            // update teks button
            btnAktif.addEventListener("click", () => {
                note.archived = !note.archived;
                this.saveToLocal(getNotesData);
                document.dispatchEvent(new CustomEvent("note-updated"))
            });

            btnArchive.addEventListener("click", () => {
                note.archived = !note.archived;
                this.saveToLocal(getNotesData);
                document.dispatchEvent(new CustomEvent("note-updated"))
            })

            console.log("cek archive: ", note.archived)
        })
    }
    saveToLocal(data) {
        if(!Array.isArray(data)) {
            console.warn("gagal menyimpan data (bukan array)", data);
            return;
        }
        localStorage.setItem("notesData",JSON.stringify(data))
    }
    

}

customElements.define('card-list', CardList)
