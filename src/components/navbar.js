import React from 'react';
import { parse } from 'query-string';
import styled from 'styled-components';
import axios from 'axios';
import settings from '../settings.js';
import { loggedIn, logout } from '../utils.js';
import { storeLogin } from '../utils.js';
import { withRouter, Redirect } from 'react-router';
import { Anchor } from 'grommet-icons';
import { 
  Heading, 
  Text,
  Grid, 
  Box,
  Button,
  Tab,
  Tabs
} from 'grommet';

const NavbarButton = styled(Button)`
  :hover {
    box-shadow: 0px 0px 0px 0px #555555;
    color: #555555;
    background-color: #F8F8F8;
  }

  border: 0px solid #FFFFFF;
  color: #F8F8F8
`

function Navbar(props) {
  return (
    <Box
      background="neutral-3"
      alignContent="center"
      justify="center"
      flex="grow"
    >
      <Heading
        style={{color: "#F8F8F8"}}
        margin="xsmall"
      > 
        Anchor CI 
      </Heading>
      { loggedIn() ? <LoggedInBar {...props} /> : <LoggedOutBar {...props} /> }
    </Box>
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
      <Box
        grow="false"
        direction="row"
        margin="xsmall"
        gap="small"
      >
        <NavbarButton
          label="Home"
          onClick={this.goHome}
        />
        <Text> | </Text>
        <NavbarButton
          label="Logout"
          onClick={this.handleLogout}
        />
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

Navbar = withRouter(Navbar);
export default Navbar;
