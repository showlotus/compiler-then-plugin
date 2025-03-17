function render() {
  const div = document.createElement('div')
  div.setAttribute('data-counter', '0')
  div.innerHTML = /* html */ `<button>Mock Project</button>`
  div.addEventListener('click', () => {
    const counter = Number(div.getAttribute('data-counter')) + 1
    div.setAttribute('data-counter', counter)
    div.innerHTML = /* html */ `<button>Mock Project - ${counter}</button>`
    document.title = `Mock Project - ${counter}`
  })
  document.body.appendChild(div)
}

function injectScript(...urls) {
  urls.forEach((url) => {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  })
}

render()

injectScript('http://localhost:13870/main.js', 'http://localhost:13871/main.js')
