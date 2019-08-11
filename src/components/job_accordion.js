import React from 'react';
import styled from 'styled-components';
import XTerminal from './terminal.js';
import { CaretUp, CaretDown } from 'grommet-icons';
import { 
  Accordion,
  AccordionPanel,
  Box,
  Collapsible,
  Text
} from 'grommet';

export default class JobAccordion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      current: -1,
      last: -1
    }
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
                <HistoryPanel
                  key={job.id}
                  job={job}
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
  :hover {
    cursor: pointer;
  }

  color: white;
`

function HistoryHeader(props) {
  return (
    <HistoryHeaderStyle
      {...props}
      direction="row-responsive"
    >
      <Box
        justify="start"
      >
        {props.title}
      </Box>
      <Box
        style={{marginLeft: "auto"}}
      >
        {
          !props.open ? <CaretDown /> : <CaretUp />
        }
      </Box>
    </HistoryHeaderStyle>
  )
}

class HistoryPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render() {
    return (
      <Box>
        <HistoryHeader
          background="dark-1"
          round="small"
          pad="medium"
          margin={{horizontal: "small"}}
          title={<Text>History ({this.props.job.id}) for {this.props.job.repository.name}.</Text>}
          open={this.state.open}
          border={{
            color: "dark-2",
            style: "dashed",
            side: "bottom"
          }}
          onClick={() => {
            this.setState({
              open: !this.state.open
            })
          }}
        />
        <Collapsible 
          open={this.state.open}
        >
          <Box
            height="small"
          >
            <XTerminal 
              text={this.props.text}
            />
          </Box>
        </Collapsible>
      </Box>
    )
  }
}
