import React from 'react';
import  { Terminal } from 'xterm';
import Button from 'antd/lib/button';
import "../../node_modules/xterm/dist/xterm.css";

const style = {
    height: '100%',
    width: '100%'
}

export default class XTerminal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      term: undefined
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.text) {
      state.term.clear()
      state.term.write(props.text)

      console.log(`Writing ${props.text}`)

      return {
        text: props.text,
        term: state.term
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  componentDidMount() {
    let term = new Terminal();
    term.open(document.getElementById('terminal'));

    this.setState({term: term})
  }

  render() {
    return (
      <div style={style}>
        <div id="terminal" style={style}>
        </div>
      </div>
    )
  }
}
