import React from 'react';
import RepoOptions from './repo_options.js';

export default class RightColumn extends React.Component {
  constructor(props) {
    super(props)
  }

  getDisplay() {
    if (this.props.repository) {
      return <RepoOptions {...this.props} />
    }
  }

  render() {
    return (
      <div>
        {
          this.getDisplay() 
        }
      </div>
    )
  }
}
