import React from 'react';
import  { Terminal } from 'xterm';
import Button from 'antd/lib/button';
import "../../node_modules/xterm/dist/xterm.css";
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as fit from 'xterm/lib/addons/fit/fit';

Terminal.applyAddon(fullscreen)
Terminal.applyAddon(fit)

export default class XTerminal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      term: undefined
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.text && state.term) {
      state.term.clear()
      state.term.reset()

      if (Array.isArray(props.text)) {
        props.text.forEach(line => {
          state.term.writeln(line)
        })
      }

      if (typeof props.text === "string") {
        state.term.writeln(props.text)
      }

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

    term.fit()

    this.setState({term: term})
  }

  render() {
    return (
      <div id="terminal">
      </div>
    )
  }
}
