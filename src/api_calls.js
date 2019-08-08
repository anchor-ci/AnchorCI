import settings from "./settings.js"

export const getLatestHistory = (jid) => {
  return settings.axios.jobInstance.get(`/latest/history/${jid}`)
}

export const getJobsFromRepo = (rid) => {
  return settings.axios.jobInstance.get(`/job/${rid}`)
}
