let settings = {}
settings.env = process.env.ENV || 'local'

let authUrl = {
  local: `http://172.18.0.1:9000`
}

let baseUrl = {
  local: `0.0.0.0:5000`
}

settings.loginRedirect = "/home"
settings.githubClientId = "8dbaad72c2fb3ec43f8d"
settings.githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${settings.githubClientId}`
settings.authUrl = authUrl[settings.env]
settings.loginUrl = `${settings.authUrl}/auth`
settings.registerUrl = `${settings.authUrl}/user`
settings.baseUrl = baseUrl[settings.env]

export default settings
