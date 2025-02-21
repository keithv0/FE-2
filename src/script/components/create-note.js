import { getNotes, addNotes } from "../data/data-note.js";


class CreateNote extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({ mode:'open' })
    }
    connectedCallback() {
        this.render();
        this.setupEventListeners()
    }
    render() {
        console.log('render dipanggil')
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .notes-input, .submit-notes{
                    box-sizing: border-box;
                    width: 100%;
                    border: 1px solid whitesmoke;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: transparent;
                    color: aliceblue;
                    margin: 10px 0;
                }
                .submit-notes{
                    cursor: pointer;
                }
            </style>
            <form action="" class="form-create" id="form-create">
                <input-app></input-app>
                
                <textarea class="notes-input" name="notes" id=""
                placeholder="Masukkan Catatan"></textarea>

                <button type="submit" class="submit-notes">Submit</button>
            </form>
        `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    setupEventListeners() {
        const form = this.shadowRoot.getElementById('form-create')
        if(!form) {
            console.log("Element form-create tidak ditemukan")
            return;
        }
        form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // ambil nilai input n textarea
        const titleInput = this.shadowRoot.querySelector('input-app')
        if(!titleInput || !titleInput.shadowRoot) {
            console.log('Element Tidak ditemukan')
            return;
        }
        const titleField = titleInput.shadowRoot.querySelector('#title-note')

        const noteTextarea = this.shadowRoot.querySelector('.notes-input')

        const title = titleField.value.trim()
        const body = noteTextarea.value.trim()

        // buat objek note baru
        const newNote = {
            id:`notes-${Math.random().toString(36).substring(2,9)}`,
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false
        }

        // add note
        addNotes(newNote)
        // localStorage.setItem("notesData",JSON.stringify(addNotes))

        console.log('Data notes setelah ditambahkan:', getNotes())

        // reset
        titleField.value = '';
        noteTextarea.value = '';
        
        
        this.dispatchEvent(new CustomEvent('note-added', {
            detail: newNote,
            bubbles: true,
            composed: true
        }))
        
    }
    
    
}


export default addNotes
customElements.define('create-note', CreateNote)