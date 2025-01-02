function render() {
  const element = document.createElement('div')

  element.innerHTML = ['Hello', 'webpack'].join('_1_    111  ,,,')

  return element
}

document.body.appendChild(render())
