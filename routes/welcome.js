/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.cookies.user;
  Data={};
  Data.data = user;
  res.send(Data);
});

module.exports = router;
