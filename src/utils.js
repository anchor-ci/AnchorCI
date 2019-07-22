const _authTokenKey = 'authToken';

export const getLoginToken = () => {
  return window.localStorage.getItem(_authTokenKey);
}

export const getPayloadFromToken = () => {
  let token = getLoginToken()

  if (!token) {
    return undefined
  }

  // Splits the JWT and parses the second portion
  return JSON.parse(atob(token.split(".")[1]))
}

export const getUserId = () => {
  let payload = getPayloadFromToken()

  if (!payload) {
    return undefined
  } 

  return payload.sub
}

export const storeLogin = (token) => {
  window.localStorage.setItem(_authTokenKey, token)
}

export const loggedIn = () => {
  return !!getLoginToken()
}

export const logout = () => {
  window.localStorage.removeItem(_authTokenKey)
}
