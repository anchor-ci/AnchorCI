let settings = {}
settings.env = process.env.ENV || 'local'

let authUrl = {
  local: `auth.default.svc.cluster.local`
}

let baseUrl = {
  local: `0.0.0.0:5000`
}

let jobUrl = {
  local: `job.default.svc.cluster.local`
}

settings.baseUrl = baseUrl[settings.env]
settings.authUrl = authUrl[settings.env]
settings.jobUrl = jobUrl[settings.env]

settings.githubRedirect = "http://192.168.39.42:31291/"
settings.HOME_URL = "/"
settings.LOGIN_REDIRECT = "/"
settings.LOGOUT_REDIRECT = "/"
settings.githubClientId = "8dbaad72c2fb3ec43f8d"
settings.githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${settings.githubClientId}&redirect_uri=${settings.githubRedirect}`
settings.userRepoUrl = `${settings.jobUrl}/repo/user`
settings.loginUrl = `${settings.authUrl}/auth`
settings.registerUrl = `${settings.authUrl}/user`
settings.syncUrl = `${settings.authUrl}/sync`
settings.jobByRepoUrl = `${settings.jobUrl}/job`
settings.jobStatusUrl = `${settings.jobUrl}/status`

export default settings
