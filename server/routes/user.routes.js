const { Routing } = require('../controllers/user.controller');
const connection = require('../models/db');
const express = require('express');
const router = express.Router()
const routing = new Routing(connection);

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/get_data', async (req, res) => routing.getUsers(req, res));
router.post('/send_users', async(req, res)=> routing.SendUsers(req, res));
router.post('/delete', async(req, res) => routing.ClearTable(req, res));
router.get('/get_user/:id', async(req, res) => routing.GetUser(req, res));

module.exports = router;