import settings from "./settings.js";
import { getToken, getUserId } from "./utils.js";

export const syncRepositories = () => {
  return settings.axios.authInstance.get(`${settings.syncUrl}/${getUserId()}`)
}

export const getRepositories = (uid) => {

}

export const getLatestHistory = (jid) => {
  return settings.axios.jobInstance.get(`/latest/history/${jid}`)
}

export const getJobsFromRepo = (rid) => {
  return settings.axios.jobInstance.get(`/job/${rid}`)
}

export const getUser = (uid) => {
  return settings.axios.authInstance.get(`/users/${uid}`)
}

export const isValidToken = (token) => {
  let config = {
    headers: {
      "x-api-key": token
    }
  }

  return settings.axios.authInstance.post(`/auth/verify`, {}, config)
}
