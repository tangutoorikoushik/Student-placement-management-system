const Application = require('../models/Application');
const Job = require('../models/Job');

const applyForJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;
    
    const existingApplication = await Application.findOne({ student: req.user._id, job: jobId });
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = new Application({
      student: req.user._id,
      job: jobId,
      resumeUrl
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('job', 'title company location status');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate('student', 'name email studentDetails');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = req.body.status || application.status;
    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus };
