import React from 'react'
import styled from 'styled-components';
import {
  Box,
  Grid,
  Button,
  Text,
  Heading
} from 'grommet';

const HeadingDivider = styled.hr`
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
`

export default class RepoOption extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Box
      >
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
            {this.props.repository.name} 
          </Heading>
        </Box>
        <HeadingDivider />
      </Box>
    )
  }
}
