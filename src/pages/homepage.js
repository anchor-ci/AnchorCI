import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getUserId } from '../utils.js';
import axios from 'axios';
import { green, red, blue } from "@ant-design/colors"
import JobList from "../components/job_list.js";
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Menu, 
  Icon, 
  Modal, 
  Button,
  List,
} from 'antd';

class SyncButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      text: "Sync Repositories",
      style: {
        margin: "0px 5px 0px 5px",
        color: "black",
      }
    }

    this.syncRepositories = this.syncRepositories.bind(this)
  }

  syncRepositories() {
    this.setState({loading: true})

    axios.get(`${settings.syncUrl}/${getUserId()}`)
    .then(res => {
      this.setState({
        text: "Done!",
        style: {
          margin: "0px 5px 0px 5px",
          color: "white",
          backgroundColor: green.primary
        }
      })
    })
    .catch(err => {
      let fontColor = "white"
      let color = red.primary
      let text = "Failed to sync repositories."

      if (err.response) {
        if (err.response.status === 400) {
          color = blue[0]
          text = "Nothing to sync!"
          fontColor = "black"
        }
      }

      this.setState({
        text: text,
        style: {
          margin: "0px 5px 0px 5px",
          color: fontColor,
          backgroundColor: color
        }
      })
    })
    .finally(() => {
      this.setState({loading: false})
    })
  }

  render() {
    return (
        <Button 
          style={this.state.style}
          onClick={this.syncRepositories}
          loading={this.state.loading}
          block
        >
          {this.state.text}
        </Button>
    )
  }
}

class LoggedInLeftColumn extends React.Component {
  constructor(props) {
    super(props)

    this.state = { repos: [] }
  }

  componentDidMount() {
    // Grab repositories for left column
    this.getRepos()
  }

  getRepos() {
    axios.get(`${settings.userRepoUrl}/${getUserId()}`, {})
    .then((res) => {
      this.setState({repos: res.data})
    })
    .catch((err) => {
      alert("Error grabbing repositories")
    })
  }

  renderRepo(item) {
    return <List.Item> {item.name} </List.Item>
  }

  getListHeader() {
    return (
      <h2> Repositories </h2>
    )
  }

  render() {
    return (
      <div style={{margin: "6px 24px 6px 24px"}}>
      {
        this.state.repos.length == 0 ?
        <List
          header={this.getListHeader()}
          style={{textAlign: "center"}}
        >
          <List.Item> 
            <h3> No repositories found! </h3>
          </List.Item>
          <List.Item> 
            <SyncButton />
          </List.Item>
        </List>
        :
        <List
          header={this.getListHeader()}
          dataSource={this.state.repos}
          renderItem={this.renderRepo}
        >
          <List.Item> 
            <SyncButton />
          </List.Item>
        </List>
      }
      </div>
    )
  }
}

class LoggedInMiddleColumn extends React.Component { 
  render() {
    return (
      <div>
        <JobList
          repository={getUserId()}
        />
      </div>
    )
  }
}

export class LoggedInHomepage extends React.Component {
  constructor(props) {
    super(props)

    this.sideColumnStyle = {
      backgroundColor: blue[0],
      height: "100%"
    }
  }

  render() {
    return (
      <Row style={{height: "100%"}}>
        <Col span={5} style={this.sideColumnStyle}>
          <LoggedInLeftColumn />
        </Col>
        <Col span={14}>
          <LoggedInMiddleColumn />
        </Col>
        <Col span={5} style={this.sideColumnStyle}>
          Bye
        </Col>
      </Row>
    )
  }
}

export class LoggedOutHomepage extends React.Component {
  render() {
    return (
      <div>
        Please login
      </div>
    )
  }
}
