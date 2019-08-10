import React from 'react';
import styled from 'styled-components';
import XTerminal from './terminal.js';
import { 
  Accordion,
  AccordionPanel,
  Box,
  Collapsible
} from 'grommet';

export default class JobAccordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      current: 0,
      last: 0
    }
  }

  componentDidMount() {
  }

  static getDerivedStateFromProps(props, state) {
    if (props.jobs) {
      if (!(state.selected.length > 0)) {
        return {
          selected: Array(props.jobs.length).fill(false)
        }
      }
    }

    return null;
  }

  setAccordion(index, state) {
    let cache = this.state.selected

    console.log(`Settings ${index} to ${state}`)

    this.setState({
      selected: [...cache.slice(0, index), state, ...cache.slice(index+1, cache.length)],
      last: this.state.current,
      current: index
    })
  }

  closeAccordions() {
    let cache = this.state.selected;
    this.setState({
      selected: [Array(cache.length).fill(false)]
    })
  }

  render() {
    return (
      <Accordion>
        {
          this.props.jobs.map((job, index) => {
            return (
              <Box
                key={job.id}
              >
                <HistoryHeader 
                  onClick={() => { 
                    this.setAccordion(this.state.last, false)
                    this.setAccordion(index, true)
                  }}
                />
                <HistoryPanel
                  key={job.id}
                  job={job}
                  open={this.state.selected[index]}
                />
              </Box>
            )
          })
        }
      </Accordion>
    )
  } 
}

const HistoryHeaderStyle = styled(Box)`
  color: white;
`

function HistoryHeader(props) {
  return (
    <HistoryHeaderStyle
      {...props}
    >
      Hello
    </HistoryHeaderStyle>
  )
}

function HistoryPanel(props) {
  return (
    <Collapsible open={props.open}>
      <Box 
        grow="horizontal"
        background="light-2"
        margin={{horizontal: "small"}}
      >
        TESTING!!!
      </Box>
    </Collapsible>
  )
}
