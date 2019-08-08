import React from 'react';
import styled from 'styled-components';
import settings from '../settings.js';
import { Text } from 'grommet';

const RepoCardParent = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 15px;
  background-size: contain;
`

export default class RepoCard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      image: undefined
    }
  }
  
  render() {
    return (
      <RepoCardParent
        style={{
          backgroundImage: `url(${settings.jobImageEndpoint}?filter=true)`
        }}
      >
        <Text> {this.props.title} </Text>
      </RepoCardParent>
    )
  }
}

