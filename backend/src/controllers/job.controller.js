const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('postedBy', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addJob = async (req, res) => {
  try {
    const { title, company, description, requirements, location, salary } = req.body;
    
    const job = new Job({
      title,
      company,
      description,
      requirements,
      location,
      salary,
      postedBy: req.user._id
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.status = req.body.status || job.status;
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, addJob, updateJob };
