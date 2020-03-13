/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const dbQuery = require('./userProfile/userProfile_db');
const func = require('./userProfile/userProfile_func');
const bearer = require('express-bearer-token');
router.use(bearer());

router.get('/', function(req, res, next) {
  const token= req.token;

  const check = async (token) =>{
    try {
      const data = await dbQuery.verifyToken(token);
      const checkResult = func.checkData(data);
      res.send(checkResult);
    } catch (e) {
      res.send(e);
    }
  };

  check(token);
});

module.exports = router;
