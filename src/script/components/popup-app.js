class PopupApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .container-modal{
                display: none;
                border-radius: 20px;
                width: 30%;
                justify-items: center;
                padding-block: 20px;
                left: 50%;
                transform: translate(-50%);
                position: fixed;
                top: 3vh;
                background-color: black;
                box-shadow: 8px 8px 22px -7px;
            }
            .container-btn{
                display: flex;
                justify-content: center;
                gap: 10px;
                
            }
            .teks-confirm{
                margin-bottom: 30px;
                font-size: 1rem;
            }
            .container-btn button{
                width: 40%;
                border-radius: 10px;
                background-color: transparent;
                color: aliceblue;
                border: 1px solid whitesmoke;
                padding-block: 10px;
                font-family: 1rem;
                cursor: pointer;
                transition: 0.3s;
            }
            .container-btn button:hover{
                background-color: rgba(80, 103, 104, 0.729);
                border: 1px solid transparent;
            }
        </style>
        <div class="container-modal">
            <div class="container-delete">
                <p class="teks-confirm">Apakah Anda Yakin Menghapus Notes Ini?</p>
                <div class="container-btn">    
                    <button type="button" class="btn-delete">Hapus</button>
                    <button type="button" class="btn-cancel">Batal</button>
                </div>
            </div>
        </div>
        `;
  }
}

customElements.define("popup-app", PopupApp);
