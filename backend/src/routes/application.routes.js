const express = require('express');
const { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/application.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const appRouter = express.Router();

appRouter.route('/')
  .post(protect, applyForJob)
  .get(protect, getMyApplications); // Student gets their own

appRouter.route('/job/:jobId')
  .get(protect, admin, getJobApplications); // Admin views apps for a job

appRouter.route('/:id')
  .put(protect, admin, updateApplicationStatus); // Admin updates status

module.exports = appRouter;
