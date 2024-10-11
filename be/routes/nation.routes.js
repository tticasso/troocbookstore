const bodyParser = require('body-parser');
const express = require('express');
const { nationController } = require('../controllers');

const nationRouter = express.Router();
nationRouter.use(bodyParser.json());

nationRouter.post('/create', nationController.createnation);
nationRouter.get('/list', nationController.listnations);
nationRouter.get('/:nationId', nationController.getnation);
nationRouter.put('/update/:nationId', nationController.updatenation);
nationRouter.delete('/delete/:nationId', nationController.deletenation);
module.exports = nationRouter;