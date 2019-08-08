import React from 'react';
import 'antd/dist/antd.css';
import settings from '../settings.js';
import { getUserId } from '../utils.js';
import axios from 'axios';
import { green, red, blue, grey } from "@ant-design/colors"
import JobList from "../components/job_list.js";
import RepoCard from "../components/repo_card.js";
import { getLatestHistory, getJobsFromRepo } from "../api_calls.js";
import styled from "styled-components";
import { 
  Button, 
  DataTable,
  Accordion,
  AccordionPanel,
  Grid,
  Box
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
    box-shadow: 0px 2px 0px 2px #555555;
    background-color: #F8F8F8;
  }

  border: 2px solid #FFFFFF;
  background-color: #FFFFFF;
`

class SyncButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "Sync Repositories"
    }

    this.syncRepositories = this.syncRepositories.bind(this)
  }

  syncRepositories() {
    axios.get(`${settings.syncUrl}/${getUserId()}`)
    .then(res => {
      this.setState({
        text: "Done!"
      })
    })
    .catch(err => {
      if (err.response) {
        if (err.response.status === 400) {
        }
      }
    })
    .finally(() => {
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
        margin="xxsmall"
        key={item.name}
        gridArea={`repo_${index}`}
        overflow="hidden"
      >
        <RepoCard
          title="Sup"
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
        alignContent="center"
        rows={Array(this.props.repositories.length).fill("xsmall")}
        columns={["xxsmall"]}
        areas={this.props.repositories.map(this.getArea)}
      >
        { this.props.repositories.map(this.renderRepo) }
      </Grid>
    )
  }
}

class LoggedInLeftColumn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      repos: [{name: "Test Repo"}, {name: "Other Repo"}, {name: "Third Repo"}]
    }
  }

  getRepos() {
    axios.get(`${settings.userRepoUrl}/${getUserId()}`, {})
    .then((res) => {
      //this.setState({repos: res.data})
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
      <RepositoryList
        repositories={this.state.repos}
        onRepoClick={item => { this.props.onRepoClick(item) }}
      />
    )
  }
}

class LoggedInMiddleColumn extends React.Component { 
  constructor(props) {
    super(props)

    this.redirect = this.redirect.bind(this)
  }

  redirect(history) {
    this.props.history.push(`/history/${history}`)
  }

  render() {
    return (
      <div>
        <JobList
          jobs={this.props.repository}
          onView={this.redirect}
        />
      </div>
    )
  }
}

export class LoggedInHomepage extends React.Component {
  constructor(props) {
    super(props)

    this.sideColumnStyle = {
      backgroundColor: "#f5f5f5",
      height: "100%"
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

    this.setState({
      jobInterval: setInterval(() => {
        this.getJobsForRepo(repo.id)
      }, this.updateJobTimer)
    })
  }

  getJobsForRepo(repo) {
    getJobsFromRepo(repo)
      .then((res) => {
        this.setState({jobs: res.data})
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
        <Col span={14}>
          <LoggedInMiddleColumn 
            {...this.props}
            repository={this.state.jobs}
          />
        </Col>
        <Col span={5} style={this.sideColumnStyle}>
          Bye
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
