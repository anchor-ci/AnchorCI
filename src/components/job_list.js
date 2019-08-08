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

  renderEntry(data) {
    console.log(data)

    return (
      <Accordion>
        <AccordionPanel label="Panel 1">
          Hello
        </AccordionPanel>
        <AccordionPanel label="Panel 2">
          Hello
        </AccordionPanel>
      </Accordion>
    )
  }

  renderGoButton(data) {
    getLatestHistory(data)
      .then(res => {
        this.state.historyIds[data.id] = res.data.id
    })
      .catch(err => {
        console.log(err)
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
