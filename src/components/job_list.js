import React from "react";
import axios from "axios";
import settings from "../settings.js";
import { Table } from "antd";

export default class JobList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobs: []
    }

    this.columns = [
      {
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "State",
        dataIndex: "state"
      }
    ]
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs() {
    axios.get(`${settings.jobByRepoUrl}/${this.props.repository}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.state.jobs}
        />
      </div>
    )
  }
}
