import React from "react";
import axios from "axios";
import settings from "../settings.js";
import { Button, DataTable, Accordion, AccordionPanel } from 'grommet';
import { CaretNext } from 'grommet-icons';
import { Table } from "antd";
import { getLatestHistory } from "../api_calls.js";

function ViewButton(props) {
  return (
      <Button 
        {...props}
        icon={<CaretNext />}
        label="View"
        active
      />
  )
}

export default class JobList extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        property: "id",
        header: <h2> ID </h2>,
        primary: true
      },
      {
        property: "url",
        header: <h2> View </h2>,
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

  renderGoButton(data) {
    getLatestHistory(data.id)
      .then(res => {
        let value = res.data.id
        let key = data.id

        if (!(key in this.state.historyIds)) {
          this.setState({
            historyIds: {...this.state.historyIds, [key]: value}
          })

          console.log(this.state)
        }
    })
      .catch(err => {
        console.log(err.response)
    })
    
    return (
      <ViewButton
        disabled={!this.state.historyIds[data.id]}
        href={`/history/${this.state.historyIds[data.id]}`}
        onClick={() => {
          !!this.props.onView ? 
          this.props.onView(this.state.historyIds[data.id]) :
          console.log("nope")
        }}
      />
    )
  }

  render() {
    return (
      <DataTable
        style={{width: "100%"}}
        columns={this.columns}
        data={this.getJobs()}
      />
    )
  }
}
