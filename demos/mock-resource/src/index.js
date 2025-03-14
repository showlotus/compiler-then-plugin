function render() {
  const element = document.createElement('div')
  element.innerText = 'this is Mock Resource: ' + new Date().toLocaleString()
  return element
}

document.body.appendChild(render())
