import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const FailureLine = styled.span`
  color: #FF4040;
`

const SuccessLine = styled.span`
  color: #00C781;
`

const NormalLine = styled.span`
`

export class HistoryView extends React.Component {
  constructor(props) {
    super(props)
  }

  getText(line, index) {
    if (line.failed) {
      return <FailureLine> {line.failureText.replace('\n', '')} </FailureLine>
    }
    
    let text = line.text.replace('\n', '')

    if (line.succeeded && index == this.props.histories.length - 1) {
      return <SuccessLine> {text} </SuccessLine>
    }

    return <NormalLine> {text} </NormalLine>
  }

  getTextLine() {
    return this.props.histories.map((history, index) => {
      let isLast = this.props.histories.length == index
      return (
        <code
          key={index}
        >
          {
            this.getText(history, index)
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
