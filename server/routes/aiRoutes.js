const express = require('express');
const aiController = require('../controllers/aiController.js');
const auth = require('../middlewares/auth.js');

const airouter = express.Router();



airouter.post('/generate-Email', auth,aiController.generateEmail );

airouter.get('/emailHistory', aiController.getEmailHistory);

module.exports = airouter;