function render() {
  const div = document.createElement('div')
  div.innerHTML = /* html */ `<button>demo</button>`
  document.body.appendChild(div)
}

render()

const script = document.createElement('script')
// script.src = 'http://127.0.0.1:8080/main.js'
// document.body.appendChild(script)
