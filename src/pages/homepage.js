import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getUserId } from '../utils.js';
import axios from 'axios';
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
  List
} from 'antd';

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
      // TODO: Remove this
      // this.setState({repos: res.data})
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

  syncRepositories() {
    console.log("ok")
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
            <Button 
              style={{margin: "0px 5px 0px 5px"}}
              onClick={this.syncRepositories}
              block
            >
              Click here to sync
            </Button>
          </List.Item>
        </List>
        :
        <List
          header={this.getListHeader()}
          dataSource={this.state.repos}
          renderItem={this.renderRepo}
        />
      }
      </div>
    )
  }
}

class LoggedInMiddleColumn extends React.Component { 
  render() {
    return (
      <div>
        <h1> Welcome </h1>
      </div>
    )
  }
}

export class LoggedInHomepage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row>
        <Col span={6}>
          <LoggedInLeftColumn />
        </Col>
        <Col span={12}>
          <LoggedInMiddleColumn />
        </Col>
        <Col span={6}>col-8</Col>
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
