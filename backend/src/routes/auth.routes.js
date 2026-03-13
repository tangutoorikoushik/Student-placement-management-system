const express = require('express');
const router = express.router; // fixing typo: Router()
const { registerUser, loginUser } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;
