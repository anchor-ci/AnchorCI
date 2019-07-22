import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getLoginToken } from '../utils.js';
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
  }

  getRepos() {
    axios.get(`${settings.userRepoUrl}/${getLoginToken()}`, {})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

    return []
  }

  render() {
    return (
      <div style={{margin: "6px"}}>
        <List
          dataSource={this.getRepos()}
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
