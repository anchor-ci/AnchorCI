import React from 'react';
import Navbar from './components/navbar.js';
import History from './pages/job.js';
import Index from './pages/index.js';
import ProtectedRoute from './components/protected_route.js';
import { loggedIn, tokenIsValid } from './utils.js';
import { LoggedInHomepage, LoggedOutHomepage } from './pages/homepage.js';
import { BrowserRouter, Redirect, Route } from "react-router-dom";

const style = {
  height: "100%",
  width: "100%",
  margin: "0px",
  padding: "0px"
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      homepage: LoggedOutHomepage
    }
  }

  componentDidMount() {
    tokenIsValid()
      .then(res => {
        this.setState({
          loggedIn: true,
          homepage: LoggedInHomepage
        })
    })
      .catch(err => {
        this.setState({
          loggedIn: false,
          homepage: LoggedOutHomepage
        })
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{height: "100%"}}>
          <Navbar loggedin={this.state.loggedIn} />
          <Route exact path="/" component={this.state.homepage} />
          <Route exact path="/history/:historyId" component={History} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
