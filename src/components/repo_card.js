import React from 'react';
import styled, { keyframes } from 'styled-components';
import settings from '../settings.js';
import { 
  Text,
  Grid,
  Box
} from 'grommet';

const Rotate = keyframes`
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(3em, 0);
  }
`

const RepoCardParent = styled.div`
  :hover {
    cursor: pointer;
    animation: ${Rotate} .2s ease-out;
    animation-fill-mode: forwards;
  }

  border: 2px solid #00739D;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 15px;
  background-size: contain;
`

const CardText = styled(Text)`
  font-size: 24px;
  color: #333333;

  margin-left: 8px;
`

export default class RepoCard extends React.Component {
  constructor(props){
    super(props)

    this.parentRef = React.createRef();
  }

  componentDidMount() {
    this.parentRef.current.addEventListener("click", (e) => { 
      if (this.props.onClick) {
        this.props.onClick(this.props.repo)
      }
    })
  }

  getUrl() {
    return encodeURI(`${settings.jobImageEndpoint}?filter=true&repo=${this.props.title}`)
  }

  getAreas() {
    let areas = [
      { name: 'top', start: [0, 0], end: [0, 0] },
      { name: 'middle', start: [0, 1], end: [0, 1] },
      { name: 'bottom', start: [0, 2], end: [0, 2] },
    ]

    return areas
  }
  
  render() {
    return (
      <RepoCardParent
        ref={this.parentRef}
        style={{
          backgroundImage: `url(${this.getUrl()})`
        }}
      >
        <Grid
          fill="vertical"
          rows={Array(3).fill("flex")}
          columns={["flex"]}
          areas={this.getAreas()}
        >
          <Box
            gridArea='bottom'
          >
            <CardText
              weight="bold"
            > 
              {this.props.repo.name} 
            </CardText>
          </Box>
        </Grid>
      </RepoCardParent>
    )
  }
}

