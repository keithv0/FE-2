class InputApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode:"open"})
    }
    connectedCallback() {
        this.render()
        this.setUpEventListener()
    }
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #title-note{
                    box-sizing: border-box;
                    width: 100%;
                    border: 1px solid whitesmoke;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: transparent;
                    color: aliceblue;
                    margin: 10px 0;
                }
                #counter-char{
                    text-align: end;
                    font-weight: 200;
                }
            </style>
                <p id="counter-char">Sisa Karakter: <span id="span-counter">50</span></p>

                <input maxlength="50" type="text" id="title-note" placeholder="masukkan judul" />
        `;
    }
    setUpEventListener() {
    this.shadowRoot.querySelector('#title-note').addEventListener('input', this.countNumber.bind(this))
    }
    
    countNumber() {
        const judulInput = this.shadowRoot.querySelector('#title-note')
        const nomorChar = this.shadowRoot.querySelector('#span-counter')
        const maxChar = 50
        const sisaChar = maxChar -  judulInput.value.length
        nomorChar.textContent = sisaChar
    }
}

customElements.define('input-app', InputApp)