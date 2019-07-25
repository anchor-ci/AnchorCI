import React from "react";
import axios from "axios";
import settings from "../settings.js";
import { Table } from "antd";

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
      }
    ]
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.jobs}
        />
      </div>
    )
  }
}
