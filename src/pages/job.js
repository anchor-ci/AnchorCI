import React from 'react';
import axios from 'axios';
import XTerminal from '../components/terminal.js';
import settings from '../settings.js';

export default class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {}
    }
  }

  componentWillMount() {
    settings.axios.jobInstance.get(`/histories/${this.props.match.params.historyId}`)
    .then((msg) => {
      this.setState({history: msg.data.history[0]})
      console.log(this.state)
    })
    .catch((err) => {
      console.log(err.response)
    })
  }

  render() {
    return (
      <div>
        <XTerminal 
          text={
            this.state.history.success ? this.state.history.text : this.state.history.failureText
          }
        />
      </div>
    )
  }
}
