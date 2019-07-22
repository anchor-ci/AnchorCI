let settings = {}
settings.env = process.env.ENV || 'local'

let authUrl = {
  local: `http://172.18.0.5:9000`
}

let baseUrl = {
  local: `0.0.0.0:5000`
}

let jobUrl = {
  local: `http://172.18.0.6:8080`
}

settings.baseUrl = baseUrl[settings.env]
settings.authUrl = authUrl[settings.env]
settings.jobUrl = jobUrl[settings.env]

settings.LOGIN_REDIRECT = "/"
settings.LOGOUT_REDIRECT = "/"
settings.githubClientId = "8dbaad72c2fb3ec43f8d"
settings.githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${settings.githubClientId}`
settings.userRepoUrl = `${settings.jobUrl}/repo/user`
settings.loginUrl = `${settings.authUrl}/auth`
settings.registerUrl = `${settings.authUrl}/user`
settings.syncUrl = `${settings.authUrl}/sync`

export default settings
