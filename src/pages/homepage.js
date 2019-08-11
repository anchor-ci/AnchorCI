import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getUserId } from '../utils.js';
import axios from 'axios';
import { green, red, blue, grey } from "@ant-design/colors"
import JobList from "../components/job_list.js";
import RepoCard from "../components/repo_card.js";
import JobAccordion from "../components/job_accordion.js";
import { getLatestHistory, getJobsFromRepo } from "../api_calls.js";
import styled from "styled-components";
import { 
  Button, 
  DataTable,
  Accordion,
  AccordionPanel,
  Grid,
  Box,
  Heading,
  Text
} from 'grommet';

import {
  Form,
  Input,
  Row,
  Col,
  Icon, 
} from 'antd';

const SyncButtonStyled = styled(Button)`
  :hover {
    box-shadow: 0px 0px 0px 0px #555555;
    background-color: white;
  }

  display: inline;
  border: 2px solid #555555;
`

class SyncButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "Sync"
    }

    this.syncRepositories = this.syncRepositories.bind(this)
  }

  syncRepositories() {
    axios.get(`${settings.syncUrl}/${getUserId()}`)
    .then(res => {
      this.setState({
        text: "Synced"
      })
    })
    .catch(err => {
      if (err.response) { 
        if (err.response.status === 400) {
          if (err.response.data.filter(item => item !== undefined).length > 0) {
            this.setState({
              text: "Synced"
            })
          } else {
            this.setState({
              text: "Failed"
            })
          }
        }
      }
    })
  }

  render() {
    return (
      <SyncButtonStyled
        label={this.state.text}
        onClick={this.syncRepositories}
      />
    )
  }
}

class RepositoryList extends React.Component {
  constructor(props) {
    super(props)

    this.renderRepo = this.renderRepo.bind(this)
  }

  renderRepo(item, index) {
    return (
      <Box
        margin="xsmall"
        key={item.name}
        gridArea={`repo_${index}`}
      >
        <RepoCard
          repo={item}
          onClick={this.props.onRepoClick}
        />
      </Box>
    )
  }

  getArea(_, index) {
    return {
      name: `repo_${index}`, 
      start: [0,index], 
      end: [1,index]
    }
  }

  render() {
    return (
      <Grid
        fill="horizontal"
        alignContent="center"
        rows={Array(this.props.repositories.length).fill("xsmall")}
        columns={["xxsmall"]}
        areas={this.props.repositories.map(this.getArea)}
      >
        { 
          this.props.repositories.map(this.renderRepo) 
        }
      </Grid>
    )
  }
}

class LoggedInLeftColumn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: []
    }
  }

  getRepos() {
    axios.get(`${settings.userRepoUrl}/${getUserId()}`, {})
    .then((res) => {
      this.setState({repos: res.data})

      // Set up the first repo as selected first
      if (this.state.repos.length > 0 && this.props.onRepoClick) {
        this.props.onRepoClick(this.state.repos[0])
      }
    })
    .catch((err) => {
      alert("Error grabbing repositories")
    })
  }

  componentDidMount() {
    this.getRepos()
  }

  render() {
    return (
      <div style={{marginTop: "24px"}}>
        <div style={{marginLeft: "8px", marginRight: "8px"}}>
          <Box
            textAlign="center"
            alignContent="end"
            direction="row-responsive"
            justify="evenly"
          >
            <Heading 
              style={{display: "inline"}}
              level="2"
              margin="none"
            >
              Repositories
            </Heading>
            <SyncButton/>
          </Box>
          <hr />
        </div>
        <RepositoryList
          repositories={this.state.repos}
          onRepoClick={item => { this.props.onRepoClick(item) }}
        />
      </div>
    )
  }
}

class LoggedInMiddleColumn extends React.Component { 
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)

    this.state = {
      history: []
    }
  }

  redirect(history) {
    this.props.history.push(`/history/${history}`)
  }

  render() {
    return (
      <JobAccordion
        jobs={this.props.repository}
        history={this.state.history}
        onClick={(item) => {
          getLatestHistory(item.id)
            .then(res => {
              this.setState({
                history: res.data
              })
          })
            .catch(err => {
              console.log("HISTORY ERROR")
          })
        }}
      />
    )
  }
}

export class LoggedInHomepage extends React.Component {
  constructor(props) {
    super(props)

    this.sideColumnStyle = {
      backgroundColor: "#f5f5f5",
      height: "100%",
      zIndex: "50"
    }

    this.middleColumnStyle = {
      backgroundColor: "#DADADA", // DO THE ROAR
      height: "100%",
      zIndex: "49"
    }

    // Every 10 seconds
    this.updateJobTimer = 10000
    this.state = {
      repos: [],
      jobs: [],
      jobInterval: undefined
    }

    this.setupMiddleColumn = this.setupMiddleColumn.bind(this);
  }

  setupMiddleColumn(repo) {
    if (this.state.jobInterval) {
      clearInterval(this.state.jobInterval)
    }

    this.getJobsForRepo(repo.id)
  }

  getJobsForRepo(repo) {
    getJobsFromRepo(repo)
      .then((res) => {
        this.setState({
          jobs: res.data,
          jobInterval: setInterval(() => {
            this.getJobsForRepo(repo)
          }, this.updateJobTimer)
        })
    })
      .catch((err) => {
        // TODO: Add failure case here
    })
  }

  render() {
    return (
      <Row style={{height: "100%"}}>
        <Col span={5} style={this.sideColumnStyle}>
          <LoggedInLeftColumn 
            {...this.props} 
            onRepoClick={this.setupMiddleColumn}
          />
        </Col>
        <Col span={14} style={this.middleColumnStyle}>
          <LoggedInMiddleColumn 
            {...this.props}
            repository={this.state.jobs}
          />
        </Col>
        <Col span={5} style={this.sideColumnStyle}>
        </Col>
      </Row>
    )
  }
}

export class LoggedOutHomepage extends React.Component {
  render() {
    return (
      <div>
        Please login
      </div>
    )
  }
}
