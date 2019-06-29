const _authTokenKey = 'authToken';

const getLoginToken = () => {
  return window.localStorage.getItem(_authTokenKey);
}

const storeLogin = (token) => {
  window.localStorage.setItem(_authTokenKey, token)
}

const loggedIn = () => {
  return !!getLoginToken()
}

const logout = () => {
  window.localStorage.removeItem(_authTokenKey)
}

module.exports = {
  storeLogin: storeLogin,
  logout: logout,
  loggedIn: loggedIn
}
