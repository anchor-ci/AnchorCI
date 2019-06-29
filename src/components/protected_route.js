import React from 'react';
import { loggedIn } from '../utils.js';
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          loggedIn() ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}
