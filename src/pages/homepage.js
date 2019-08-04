import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getUserId } from '../utils.js';
import axios from 'axios';
import { green, red, blue } from "@ant-design/colors"
import JobList from "../components/job_list.js";
import { getLatestHistory } from "../api_calls.js";
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

    this.renderRepo = this.renderRepo.bind(this)
  }

  renderRepo(item) {
    const buttonStyle = {
      height: "100%",
      width: "100%",
    }

    return (
      <List.Item> 
        <Button 
          style={buttonStyle}
          onClick={() => {this.props.onClick(item)}}
        >{item.name}</Button>
      </List.Item>
    )
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
        this.props.repositories.length == 0 ?
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
          dataSource={this.props.repositories}
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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <JobList
          jobs={this.props.repository}
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
  
    // Every 10 seconds
    this.updateJobTimer = 10000

    this.state = {
      repos: [],
      jobs: [],
      jobInterval: undefined
    }
  }

  componentDidMount() {
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

  setupMiddleColumn(repo) {
    if (this.state.jobInterval) {
      clearInterval(this.state.jobInterval)
    }

    this.getJobsForRepo(repo)

    this.setState({
      jobInterval: setInterval(() => {this.getJobsForRepo(repo)}, this.updateJobTimer)
    })
  }

  getJobsForRepo(repo) {
    axios.get(`${settings.jobByRepoUrl}/${repo.id}`, {})
    .then((res) => {
      this.setState({jobs: res.data})
    })
    .catch((err) => {
      // TODO: Add failure case here
    })
  }

  render() {
    return (
      <Row style={{height: "100%"}}>
        <Col span={5} style={this.sideColumnStyle}>
          <LoggedInLeftColumn 
            repositories={this.state.repos}
            onClick={(item) => { this.setupMiddleColumn(item) }}
          />
        </Col>
        <Col span={14}>
          <LoggedInMiddleColumn 
            repository={this.state.jobs}
          />
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
