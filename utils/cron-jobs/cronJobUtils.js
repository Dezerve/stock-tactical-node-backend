// from le chat - mistral
const cron = require('node-cron');

// Array to store job references
const jobs = [];

// Function to create a new cron job
function createJob(schedule, task, name) {
  const job = cron.schedule(schedule, task);
  jobs.push({ name, job, schedule });
  console.log(`Created job "${name}" with schedule "${schedule}"`);
  return job;
}

// Function to list all jobs
function listJobs() {
  console.log('Listing all cron jobs:');
  jobs.forEach(jobInfo => {
    console.log(`Job Name: ${jobInfo.name}, Schedule: ${jobInfo.schedule}`);
  });
}

// Function to stop a job by name
function stopJob(name) {
  const jobInfo = jobs.find(job => job.name === name);
  if (jobInfo) {
    jobInfo.job.stop();
    console.log(`Stopped job "${name}"`);
  } else {
    console.log(`Job "${name}" not found`);
  }
}

/* 

// Example usage
createJob('* * * * *', () => {
  console.log('Running job every minute');
}, 'everyMinuteJob');

createJob('0 * * * *', () => {
  console.log('Running job every hour');
}, 'everyHourJob');

// List all jobs
listJobs();

// Stop a specific job
stopJob('everyMinuteJob');

*/
