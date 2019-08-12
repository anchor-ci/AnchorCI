import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const FailureLine = styled.span`
  color: red;
`

const SuccessLine = styled.span`
  color: green;
`

const NormalLine = styled.span`
`

export class HistoryView extends React.Component {
  constructor(props) {
    super(props)
  }

  getText(line) {
    if (line.failed) {
      return <FailureLine> {line.failureText.replace('\n', '')} </FailureLine>
    }

    return <NormalLine> {line.text.replace('\n', '')} </NormalLine>
  }

  getTextLine() {
    return this.props.histories.map((history, index) => {
      let isLast = this.props.histories.length == index
      return (
        <code
          key={index}
        >
          {
            this.getText(history)
          }
          {
            !isLast ? <br /> : <span></span>
          }
        </code>
      )
    })
  }

  render() {
    return (
      <Box
        background="dark-3"
        pad="small"
        margin={{horizontal: "medium"}}
      >
        <pre>
          {
            !!this.props.histories ? this.getTextLine() : ""
          }
        </pre>
      </Box>
    )
  }
}
