import { ProxyState } from "../AppState.js"
import { jobService } from "../Services/JobService.js"

function _draw() {
  let template = ''
  ProxyState.jobs.forEach(j => template += j.Template)
  document.getElementById('listings').innerHTML = template
  document.getElementById('car-form').classList.add('hidden')
  document.getElementById('house-form').classList.add('hidden')
  document.getElementById('job-form').classList.remove('hidden')
}
export default class JobController {
  constructor() {
    console.log("hello from job controller")
    ProxyState.on("jobs", _draw)
  }

  getJobs() {
    jobService.getJobs()
  }

  postJob(e) {
    e.preventDefault()
    let form = e.target
    let newJob = {
      jobTitle: form.jobTitle.value,
      company: form.company.value,
      rate: form.rate.value,
      hours: form.hours.value,
      description: form.description.value
    }
    jobService.postJob(newJob)
    form.reset()
  }

  deleteJob(jobId) {
    jobService.deleteJob(jobId)
  }

  editJob(e, jobId) {
    e.preventDefault()
    let form = e.target
    let editedJob = {
      jobTitle: form.jobTitle.value,
      company: form.company.value,
      rate: form.rate.value,
      hours: form.hours.value,
      description: form.description.value,
      _id: jobId
    }

    // @ts-ignore
    $('#editJobModal-' + jobId).modal('toggle')
    jobService.editJob(editedJob)
  }
}