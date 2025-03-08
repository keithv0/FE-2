class LoadingApp extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode:'open' })
    }
    connectedCallback() {
      this.render();
    }
    render() {
      this.shadowRoot.innerHTML = `
      <style>
          .container-spin{
              width: 100%;
              height: 100vh;
              position: fixed;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .spinner {
              width: 100px;
              height: 100px;
              position: absolute;
              
          }
  
          .double-bounce1,
          .double-bounce2 {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: orange;
              opacity: 0.6;
              position: absolute;
              top: 0;
              left: 0;
  
              -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
              animation: sk-bounce 2.0s infinite ease-in-out;
          }
  
          .double-bounce2 {
              -webkit-animation-delay: -1.0s;
              animation-delay: -1.0s;
          }
  
          @-webkit-keyframes sk-bounce {
  
              0%,
              100% {
                  -webkit-transform: scale(0.0)
              }
  
              50% {
                  -webkit-transform: scale(1.0)
              }
          }
  
          @keyframes sk-bounce {
  
              0%,
              100% {
                  -webkit-transform: scale(0.0);
                  transform: scale(0.0);
              }
  
              50% {
                  -webkit-transform: scale(1.0);
                  transform: scale(1.0);
              }
          }
      </style>
          <div class="container-spin">
              <div class="spinner">
                  <div class="double-bounce1"></div>
                  <div class="double-bounce2"></div>
               </div>
           </div>
          `;
      }
  }
  
  customElements.define("loading-app", LoadingApp);
  