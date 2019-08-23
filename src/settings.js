import axios from 'axios';

let settings = {}
settings.env = process.env.ENV || 'local'

let authUrl = {
  local: `http://192.168.39.42:30001`
}

let baseUrl = {
  local: `0.0.0.0:5000`
}

let jobUrl = {
  local: `http://192.168.39.42:30002`
}

settings.baseUrl = baseUrl[settings.env]
settings.authUrl = authUrl[settings.env]
settings.jobUrl = jobUrl[settings.env]

let axiosSettings = {
  local: {
    jobInstance: axios.create({
      baseURL: settings.jobUrl
    }),
    authInstance: axios.create({
      baseURL: settings.authUrl
    }),
  }
}

settings.axios = axiosSettings[settings.env]
settings.HOME_URL = "/"
settings.LOGIN_REDIRECT = "/"
settings.LOGOUT_REDIRECT = "/"
settings.githubClientId = "Iv1.c42406c3c7776c7d"
settings.githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${settings.githubClientId}`
settings.userRepoUrl = `${settings.jobUrl}/repo/user`
settings.loginUrl = `${settings.authUrl}/auth`
settings.registerUrl = `${settings.authUrl}/user`
settings.syncUrl = `${settings.authUrl}/sync`
settings.jobByRepoUrl = `${settings.jobUrl}/job`
settings.jobStatusUrl = `${settings.jobUrl}/status`
settings.jobImageEndpoint = `${settings.jobUrl}/images/repo`

export default settings
