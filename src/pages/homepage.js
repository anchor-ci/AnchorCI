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
      this.setState({repos: res.data})
    })
    .catch((err) => {
      alert("Error grabbing repositories")
    })
  }

  renderRepo(item) {
    return <List.Item> {item.name} </List.Item>
  }

  render() {
    return (
      <div style={{margin: "6px 24px 6px 24px"}}>
        <List
          header={<h2>Repositories</h2>}
          dataSource={this.state.repos}
          renderItem={this.renderRepo}
        />
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
