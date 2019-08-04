import settings from "./settings.js"

export const getLatestHistory = (jid) => {
  return settings.axios.jobInstance.get(`/latest/history/${jid}`)
}
