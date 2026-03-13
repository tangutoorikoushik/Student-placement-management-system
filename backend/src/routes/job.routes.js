const express = require('express');
const { getJobs, addJob, updateJob } = require('../controllers/job.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const jobRouter = express.Router();

jobRouter.route('/')
  .get(getJobs)
  .post(protect, admin, addJob);

jobRouter.route('/:id')
  .put(protect, admin, updateJob);

module.exports = jobRouter;
