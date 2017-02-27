import React from 'react'
import ReactDOM from 'react-dom'

// 继承反转 - 条件渲染
export function IIHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      return this.props.visible ? super.render() : null
    }
  }
}

class Example extends React.Component {
  render() {
    return (
      <p>Im a wrapped component</p>
    )
  }
}

const EnhancedExample = IIHOC(Example)

class Wrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: true
    }
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleClick.bind(this)}>
          {this.state.visible ? 'hide' : 'show'}
          </button>
        </div>
        <EnhancedExample visible={this.state.visible} />
        {React.createElement(IIHOC(Example), {visible: this.state.visible}, null)}
      </div>
    )
  }
}

ReactDOM.render(<Wrapper />, document.getElementById('root'))
