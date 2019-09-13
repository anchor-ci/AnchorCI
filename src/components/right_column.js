import React from 'react';
import { triggerJob } from '../api_calls.js';
import RepoOptions from './repo_options.js';
import { BaseButtonStyled } from '../components/kit.js';
import Stats from '../components/repo_stats.js';
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

export default class RightColumn extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      options: true
    }
  }

  triggerJob = () => {
    triggerJob(this.props.repository.id)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  getStats() {
    return {}
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
            {/* TODO: Style this button to pop out */}
          <BaseButtonStyled
            label="Trigger"
            onClick={this.triggerJob}
          />
          <BaseButtonStyled
            label="Stats"
            onClick={() => { this.setState({options: false}) }}
          />
        </Box>
        <HeadingDivider />
        {
          this.state.options ? <RepoOptions {...this.props} /> : <Stats {...this.props} stats={this.getStats()} />
        }
      </div>
    )
  }
}
