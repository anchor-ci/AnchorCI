import React from 'react';
import axios from 'axios';
import XTerminal from '../components/terminal.js';
import settings from '../settings.js';
import * as chalk from 'chalk';

let options: any = {enabled: true, level: 2};
const chalked = new chalk.constructor(options);

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      histories: []
    }
  }

  componentWillMount() {
    this.getHistory()
    setInterval(() => { this.getHistory() }, 10000)
  }

  getHistory() {
    settings.axios.jobInstance.get(`/histories/${this.props.match.params.historyId}`)
    .then((msg) => {
      // Only modify history state if we get new results
      if (this.state.histories.length != msg.data.history.length) {
        this.setState({
          histories: msg.data.history
        })
      }
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  getText(history) {
    if (history.succeeded) {
      return history.text
    }

    return chalked.red(history.failureText)
  }

  render() {
    return (
      <div>
        <XTerminal 
          text={this.state.histories.map(this.getText)}
        />
      </div>
    )
  }
}
