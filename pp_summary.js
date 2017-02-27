import React from 'react'
import ReactDOM from 'react-dom'

function PPHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this)
      this.readInstance = this.readInstance.bind(this)
    }

    readInstance(instance) {
      // read instance of WrappedComponent
      console.log('intance.instanceName', instance.instanceName)
      console.log('intance.state', instance.state)
      console.log('intance.props', instance.props)
    }

    handleNameChange(evt) {
      // 提取子组件中input的值作为自身的state
      this.setState({
        name: evt.target.value
      })
    }

    render() {
      // 属性代理的三种用法：
      // pattern 1. 操作props，对props做增删改
      // pattern 2. 读取实例，即添加ref这个特殊的prop
      // pattern 3. 提取state
      const props = Object.assign({}, this.props, {
        otherProp: 'test',        // pattern 1
        ref: this.readInstance,   // pattern 2
        name: {                   // pattern 3
          value: this.state.name,
          onChange: this.handleNameChange
        }
      })

      return (
        <div>
          <h2>Enhanced Component</h2>
          <p>props</p>
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>state</p>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <WrappedComponent {...props} />
        </div>
      )
    }
  }
}


class Example extends React.Component {
  constructor(props) {
    super(props)
    this.instanceName = 'skinny component'
    this.state = {
      saying: 'Enhance me!'
    }
  }
  render() {
    return (
      <div>
        <h2>Wrapped Component</h2>
        <p>props</p>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        <p>state</p>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <input type="text" name="name" {...this.props.name} />
      </div>
    )
  }
}

const EnhancedExample = PPHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toISOString()}/>, document.getElementById('root'))
