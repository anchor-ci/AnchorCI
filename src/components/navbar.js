import React from 'react';
import { parse } from 'query-string';
import axios from 'axios';
import settings from '../settings.js';
import 'antd/dist/antd.css';
import { loggedIn, logout } from '../utils.js';
import { storeLogin } from '../utils.js';
import { withRouter, Redirect } from 'react-router';
import {
  Alert,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Menu, 
  Icon, 
  Modal, 
  Button 
} from 'antd'

class LoggedInBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
    const { history } = this.props;
    logout()
    history.push('/')
  }

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item
          onClick={this.goHome}
        >
          Home
        </Menu.Item>
        <Menu.Item 
          style={{"float": "right"}}
          onClick={this.handleLogout}
        >
           Logout
        </Menu.Item>
      </Menu>
    )
  }
}

class LoggedOutBar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const queryParams = parse(this.props.location.search);
    const code = queryParams.code;

    if (code) {
      axios.get(`${settings.authUrl}/auth/github?code=${code}`)
      .then((res) => {
        // If we got a successful login
        if (res.status === 200 || res.status === 201) {
          if (res.data) {
            const { history } = this.props
            storeLogin(res.data)
            history.push(settings.loginRedirect)
          }
        }
      })
      .catch((err) => {
        alert(`An error ocurred signing in: ${err.response}`)
      })
    }
  }

  redirectLogin = () => {
    window.location.href = settings.githubAuthUrl
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/home');
  }

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item
          onClick={this.goHome}
        >
          Home
        </Menu.Item>
        <Menu.Item 
          style={{
            "float": "right",
            "paddingLeft": "10px",
            "paddingRight": "10px",
            "fontSize": "16px",
          }}
          onClick={this.redirectLogin}
        >
           <Icon type="github" />
        </Menu.Item>
        <Menu.Item
          style={{"float": "right"}}
        >
          Continue with:
        </Menu.Item>
      </Menu>
    )
  }
}
export default class Navbar extends React.Component {
    constructor(props) {
      super(props)
    }

    getMenu = () => {
      let menu = <LoggedOutBar 
        history={this.props.history} 
        location={this.props.location}
      />

      if (loggedIn()) {
        menu = <LoggedInBar 
          history={this.props.history} 
          location={this.props.location}
        />
      }

      return menu;
    }

    render() {
        return (
          <div>
            {this.getMenu()}
          </div>
        )
    }
}

Navbar = withRouter(Navbar);
