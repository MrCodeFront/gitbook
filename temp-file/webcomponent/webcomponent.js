class CodeFront extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const span = document.createElement('span');
    span.setAttribute('class', 'code-front-text');
    setTimeout(() => {
      span.textContent = this.getAttribute('text') || '默认内容';
    }, 10);

    const style = document.createElement('style');
    style.textContent = `
      .code-front-text {
        font-family: 微软雅黑;
        font-weight: 400;
        font-size: 80px;
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.1);    
        background: #ed8080;
        
        background: linear-gradient(to right, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
        
        filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#ed8080', endColorstr='#5eb524', GradientType=1);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        animation: shimmer infinite 3s linear;
        -webkit-animation: shimmer infinite 3s linear;
        background-repeat: no-repeat;
        background-position: top left;
        background-color: #222;
      }
      @keyframes shimmer {
        0% {
            background-position: top left;
        }
        100% {
            background-position: top right;
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(span);
  }
}

// Define the new element
customElements.define('code-front', CodeFront);


// class CodeFront extends HTMLElement {
//   constructor() {
//     // Always call super first in constructor
//     super();

//     // Create a shadow root
//     // open：shadow root元素可以从js外部访问根节点
//     // closed：拒绝从js外部访问关闭的shadow root节点
//     const shadow = this.attachShadow({
//       mode: 'open'
//     });

//     // Create div
//     const wrapper = document.createElement('div');
//     wrapper.setAttribute('class', 'wrapper');

//     // Create input
//     const input = document.createElement('input');

//     // Define Attribute
//     const placeholder = this.getAttribute('placeholder');
//     input.placeholder = placeholder || '暂无提示';

//     // Create some CSS to apply to the shadow dom
//     const style = document.createElement('style');
//     style.textContent = `
//       .wrapper{
//         display: inline-block;
//       }
//     `;

//     wrapper.appendChild(input);
//     shadow.appendChild(style);
//     shadow.appendChild(wrapper);
//   }
// }

// // Define the new element
// customElements.define('code-front', CodeFront);

