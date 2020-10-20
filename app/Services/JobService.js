import { ProxyState } from "../AppState.js"
import Job from "../Models/Job.js"
import { api } from "../Services/AxiosService.js"


class JobService {
  constructor() {
    console.log("hello from job service")
  }
  postJob(newJob) {
    api.post("jobs", newJob).then(res => {
      this.getJobs()
    }).catch(err => console.error(err))
  }
  deleteJob(jobId) {
    api.delete("jobs/" + jobId).then(res => {
      this.getJobs()
    }).catch(err => console.error(err))
  }
  editJob(editedJob) {
    api.put("jobs/" + editedJob._id, editedJob).then(res => {
      this.getJobs()
    }).catch(err => console.error(err))
  }

  getJobs() {
    api.get("jobs").then(res => {
      ProxyState.jobs = res.data.data.map(newJobData => new Job(newJobData))
    }).catch(err => console.error(err))
  }

}

export const jobService = new JobService()