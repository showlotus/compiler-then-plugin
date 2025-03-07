function render() {
  const div = document.createElement('div')
  div.innerHTML = /* html */ `<button>demo</button>`
  document.body.appendChild(div)
}

render()

const script = document.createElement('script')
script.src = 'http://localhost:8080/main.js'
document.body.appendChild(script)
