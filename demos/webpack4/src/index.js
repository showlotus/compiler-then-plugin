function render() {
  const element = document.createElement('div')
  element.innerText = 'Webpack4'
  element.style = /* style */ `
    position: fixed;
    right: 16px;
    top: 72px;
    padding: 0 8px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 2px solid crimson;
    box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.2);
  `
  return element
}

document.body.appendChild(render())
