import React from "react";
import axios from "axios";
import settings from "../settings.js";
import { Table, Button } from "antd";
import { getLatestHistory } from "../api_calls.js";

export default class JobList extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "State",
        dataIndex: "state"
      },
      {
        dataIndex: "url",
        render: this.renderGoButton.bind(this)
      }
    ]

    this.state = {
      historyIds: []
    }

    this.getJobs = this.getJobs.bind(this)
  }

  // Return the jobs with their IDs as their keys
  getJobs() {
    let repos = []

    this.props.jobs.forEach(job => {
      repos.push({key: job.id, ...job})
    })

    return repos
  }

  renderGoButton(_, obj, index) {
    getLatestHistory(obj.key)
      .then(res => {
        this.state.historyIds.push(res.data.id)
    })
      .catch(err => {
        console.log(err)
    })
    
    return (
      <Button
        disabled={!!this.state.historyIds[index]}
        onClick={() => {
          !!this.props.onView ? this.props.onView(this.state.historyIds[index]) : console.log("nope")
        }}
        shape="round"
        size="large"
      >
        View
      </Button>
    )
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.getJobs()}
        />
      </div>
    )
  }
}
