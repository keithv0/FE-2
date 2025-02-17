class CreateNote extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({ mode:'open' })
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
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
            <form action="" class="form-create">
                <input-app></input-app>
                
                <textarea class="notes-input" name="notes" id=""
                placeholder="Masukkan Catatan"></textarea>

                <button type="submit" class="submit-notes">Submit</button>
            </form>
        `;
    }
}
customElements.define('create-note', CreateNote)