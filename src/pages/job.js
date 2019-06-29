import React from 'react';
import axios from 'axios';
import XTerminal from '../components/terminal.js';
import settings from '../settings.js';

export default class Job extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          jobId: null,
          report: null,
          instance: axios.create(settings.axios)
        }
    }

    componentWillMount() {
        this.state.instance.get(`/job/${this.props.match.params.jobId}`)
        .then((msg) => {
            this.setState({report: msg.data.report})
        })
        .catch((err) => {

        })
    }

    componentDidMount() {
    }

    onJobSubmit = (e) => {
      let headers = Object.assign({}, settings.axios.headers)

      axios.post(`http://0.0.0.0:5000/job`, {
          "job_info": {
              "image": "nginx:1.12.15",
              "instructions": [
                  "echo hello"
              ]
          }
      }, {headers: headers})
      .then((msg) => {
        this.setState({jobId: msg.data.job_id})
        console.log(this.state)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    onJobStart = (e) => {
        axios.post(`http://0.0.0.0:5000/job`, {
            "start": this.state.jobId
        })
        .then((msg) => {
            console.log(msg)
        })
        .catch((err) => {

        })
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.onJobSubmit}>Submit Job</button>
                    <button onClick={this.onJobStart}>{this.state.jobId ? `Start Job ${this.state.jobId}` : "No job"}</button>
                </div>
                <XTerminal />
            </div>
        )
    }
}
