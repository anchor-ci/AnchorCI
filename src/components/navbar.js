import React from 'react';
import { parse } from 'query-string';
import styled from 'styled-components';
import axios from 'axios';
import settings from '../settings.js';
import 'antd/dist/antd.css';
import { green, red, blue, grey } from "@ant-design/colors"
import { loggedIn, logout } from '../utils.js';
import { storeLogin } from '../utils.js';
import { withRouter, Redirect } from 'react-router';
import { 
  Heading, 
  Grid, 
  Box,
  Button,
  Tab,
  Tabs
} from 'grommet';

import {
  Form,
  Menu, 
  Icon, 
  Modal, 
} from 'antd';

let headerColor = "#00739D"

const NavbarButton = styled(Button)`
  :hover {
    box-shadow: 0px 2px 0px 2px #555555;
    background-color: #F8F8F8;
  }

  border: 2px solid #FFFFFF;
  background-color: #FFFFFF;
`

function BaseNavbar(props) {
  return (
    <Grid
      style={{backgroundColor: headerColor}} 
      alignContent="center"
      rows={["xxsmall"]}
      columns={["full"]}
      areas={[
        { name: 'header', start: [0,0], end: [1,0] }
      ]}
    >
      <Box 
        fill="horizontal"
        gridArea='header' 
        border="bottom"
        direction="row"
        basis="small"
        gap="small"
      >
        <Heading style={{color: "white", float:"left"}}> anchor </Heading>
        {props.children}
      </Box>
    </Grid>
  )
}

class LoggedInBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
    const { history } = this.props;
    logout()
    history.push(settings.LOGOUT_REDIRECT)
  }

  goHome = () => {
    const { history } = this.props;
    history.push(settings.HOME_URL)
  }

  render() {
    return (
      <Box direction="row" fill="horizontal">
        <Box
          direction="row"
          justify="start"
        >
          <NavbarButton
            margin="xsmall"
            gridArea="header"
            label="Home"
            onClick={this.goHome}
          />
        </Box>
        <Box
          direction="row"
          justify="between"
        >
          <NavbarButton
            margin="xsmall"
            gridArea="header"
            label="Logout"
            onClick={this.handleLogout}
          />
        </Box>
      </Box>
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

    if (code && !loggedIn()) {
      axios.get(`${settings.authUrl}/auth/github?code=${code}`)
      .then((res) => {
        // If we got a successful login
        if (res.status === 200 || res.status === 201) {
          if (res.data) {
            storeLogin(res.data)
            this.props.history.push(settings.LOGIN_REDIRECT)
          }
        }
      })
      .catch((err) => {
        alert("An error ocurred signing in.")
        console.log(err.response)
      })
    }
  }

  redirectLogin = () => {
    window.location.href = settings.githubAuthUrl
  }

  render() {
    return (
      <div
        gridArea="header"
      >
        <NavbarButton
          label="Login"
          onClick={this.redirectLogin}
        />
      </div>
    )
  }
}

export default function Navbar(props) {
  return (
    <BaseNavbar>
      { loggedIn() ? <LoggedInBar {...props} /> : <LoggedOutBar {...props} /> }
    </BaseNavbar>
  )
}

Navbar = withRouter(Navbar);
