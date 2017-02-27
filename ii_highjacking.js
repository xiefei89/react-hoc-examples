import React from 'react'
import ReactDOM from 'react-dom'

// 继承反转 - 渲染劫持
export function IIHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      const elementsTree = super.render()
      let newProps = {};
      if (elementsTree && elementsTree.type === 'input') {
        newProps = {value: 'may the force be with you'}
      }
      const props = Object.assign({}, elementsTree.props, newProps)
      const newElementsTree = React.cloneElement(
        elementsTree, props, elementsTree.props.children
      )
      return newElementsTree
    }
  }
}

class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <input value={this.state.value} onChange={this.handleChange.bind(this)} />
    )
  }
}

const EnhancedExample = IIHOC(Example)

ReactDOM.render(<EnhancedExample />, document.getElementById('root'))
