import React from 'react';
import RepoOptions from './repo_options.js';
import { BaseButtonStyled } from '../components/kit.js';
import styled from 'styled-components';
import {
  Grid,
  Box,
  Heading,
  Button
} from 'grommet';

const HeadingDivider = styled.hr`
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
`

class Stats extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default class RightColumn extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      options: false
    }
  }

  getDisplay() {
    if (this.state.options) {
      return <RepoOptions {...this.props} />
    }

    return <Stats {...this.props} />
  }

  render() {
    return (
      <div>
        <Box
          margin="xxsmall"
          textAlign="center"
          alignContent="end"
          direction="row-responsive"
          justify="evenly"
        >
          <Heading
            level="3"
          > 
            {
              this.props.repository ? this.props.repository.name : console.log()
            }
          </Heading>
        </Box>
        <Box
          margin="xxsmall"
          textAlign="center"
          alignContent="end"
          direction="row-responsive"
          justify="evenly"
        >
          <BaseButtonStyled
            label="Options"
            onClick={() => { this.setState({options: true}) }}
          />
          <BaseButtonStyled
            label="Stats"
            onClick={() => { this.setState({options: false}) }}
          />
        </Box>
        <HeadingDivider />
        {
          this.getDisplay() 
        }
      </div>
    )
  }
}
