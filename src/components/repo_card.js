import React from 'react';
import styled from 'styled-components';
import { Text } from 'grommet';

class RepoCardChild extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Text> {this.props.title} </Text>
      </div>
    )
  }
}

const RepoCard = styled(RepoCardChild)`
  height: 100%;
  width: 100%;

  border-radius: 0px;
`

export default RepoCard
